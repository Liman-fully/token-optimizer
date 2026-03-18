#!/usr/bin/env node

/**
 * Token Optimizer - Auto Update Script
 * 
 * 自动更新机制：
 * 1. 检查 GitHub 远程版本
 * 2. 对比本地版本
 * 3. 有新版本时自动拉取（备份本地修改）
 * 4. 记录更新日志
 * 
 * 使用方式：
 *   npx token-optimizer check-update  - 检查更新
 *   npx token-optimizer update        - 立即更新
 *   npx token-optimizer auto          - 自动模式（心跳调用）
 * 
 * 心跳配置：
 *   在 HEARTBEAT.md 中添加：
 *   - 每天凌晨检查更新
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const SKILL_DIR = path.join(
  process.env.OPENCLAW_WORKSPACE || path.join(os.homedir(), '.openclaw', 'workspace'),
  'skills', 'token-optimizer'
);

const GITHUB_REPO = 'https://github.com/Liman-fully/token-optimizer';
const VERSION_FILE = path.join(SKILL_DIR, '.version');
const UPDATE_LOG = path.join(SKILL_DIR, '.update-log');

// 当前版本（从 package.json 读取）
function getCurrentVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(SKILL_DIR, 'package.json'), 'utf-8'));
    return pkg.version;
  } catch {
    return 'unknown';
  }
}

// 执行命令
function run(cmd, cwd = SKILL_DIR, silent = false) {
  try {
    const result = execSync(cmd, {
      cwd,
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit',
      timeout: 30000
    });
    return { success: true, output: result?.trim() || '' };
  } catch (e) {
    return { success: false, error: e.message, output: e.stdout?.trim() || '' };
  }
}

// 检查是否已安装
function checkInstalled() {
  if (!fs.existsSync(SKILL_DIR)) {
    console.log('❌ Token Optimizer 未安装');
    console.log(`请运行: git clone ${GITHUB_REPO} "${SKILL_DIR}"`);
    return false;
  }
  
  if (!fs.existsSync(path.join(SKILL_DIR, '.git'))) {
    console.log('⚠️  不是 Git 仓库，无法自动更新');
    console.log('建议重新安装: rm -rf "' + SKILL_DIR + '" && git clone ' + GITHUB_REPO + ' "' + SKILL_DIR + '"');
    return false;
  }
  
  return true;
}

// 检查更新
function checkUpdate() {
  if (!checkInstalled()) return null;
  
  console.log('🔍 检查更新...');
  
  // 拉取远程信息
  const fetchResult = run('git fetch origin', SKILL_DIR, true);
  if (!fetchResult.success) {
    console.log('❌ 无法连接 GitHub:', fetchResult.error);
    return null;
  }
  
  // 获取本地和远程版本
  const localHash = run('git rev-parse HEAD', SKILL_DIR, true).output;
  const remoteHash = run('git rev-parse origin/main', SKILL_DIR, true).output;
  
  if (!localHash || !remoteHash) {
    console.log('❌ 无法获取版本信息');
    return null;
  }
  
  if (localHash === remoteHash) {
    console.log('✅ 已是最新版本 v' + getCurrentVersion());
    return { hasUpdate: false };
  }
  
  // 获取更新内容
  const behind = run('git rev-list --count HEAD..origin/main', SKILL_DIR, true).output;
  const changelog = run('git log --oneline HEAD..origin/main', SKILL_DIR, true).output;
  
  console.log(`\n📦 发现新版本! (落后 ${behind} 个提交)`);
  console.log('\n更新内容:');
  console.log(changelog);
  
  return {
    hasUpdate: true,
    behind: parseInt(behind),
    changelog,
    localHash,
    remoteHash
  };
}

// 备份当前版本
function backup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = path.join(SKILL_DIR, '.backups', `backup-${timestamp}`);
  
  try {
    fs.mkdirSync(backupDir, { recursive: true });
    
    // 备份关键文件
    const filesToBackup = ['SKILL.md', 'references/'];
    filesToBackup.forEach(file => {
      const src = path.join(SKILL_DIR, file);
      const dest = path.join(backupDir, file);
      if (fs.existsSync(src)) {
        if (fs.statSync(src).isDirectory()) {
          fs.cpSync(src, dest, { recursive: true });
        } else {
          fs.copyFileSync(src, dest);
        }
      }
    });
    
    console.log(`💾 已备份到: ${backupDir}`);
    return backupDir;
  } catch (e) {
    console.log('⚠️  备份失败:', e.message);
    return null;
  }
}

// 执行更新
function update(auto = false) {
  if (!checkInstalled()) return false;
  
  const updateInfo = checkUpdate();
  if (!updateInfo) return false;
  
  if (!updateInfo.hasUpdate) {
    return true; // 已是最新
  }
  
  // 检查本地是否有未提交的修改
  const statusResult = run('git status --porcelain', SKILL_DIR, true);
  const hasLocalChanges = statusResult.output && statusResult.output.trim().length > 0;
  
  if (hasLocalChanges) {
    console.log('⚠️  检测到本地修改:');
    console.log(statusResult.output);
    console.log('\n💡 建议:');
    console.log('  1. 如果是个人定制，请忽略此更新');
    console.log('  2. 如果要更新，先手动提交: git add . && git commit -m "local changes"');
    console.log('  3. 或强制更新（会丢失本地修改）: npx token-optimizer update --force');
    
    // 自动模式下跳过更新
    if (auto) {
      logUpdate('跳过更新（有本地修改）');
      return false;
    }
    
    return false;
  }
  
  // 备份
  if (!auto) {
    backup();
  }
  
  // 拉取更新
  console.log('\n⬇️  正在更新...');
  const pullResult = run('git pull origin main', SKILL_DIR);
  
  if (pullResult.success) {
    const newVersion = getCurrentVersion();
    console.log(`\n✅ 更新成功! v${newVersion}`);
    
    // 记录更新日志
    logUpdate(`更新到 v${newVersion}\n${updateInfo.changelog}`);
    
    // 自动模式下静默完成
    if (!auto) {
      console.log('\n📝 更新内容:');
      console.log(updateInfo.changelog);
    }
    
    return true;
  } else {
    console.log('❌ 更新失败:', pullResult.error);
    return false;
  }
}

// 记录更新日志
function logUpdate(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  try {
    fs.appendFileSync(UPDATE_LOG, logEntry);
  } catch {
    // 忽略日志写入失败
  }
}

// 获取上次更新时间
function getLastUpdate() {
  try {
    if (!fs.existsSync(UPDATE_LOG)) return null;
    const logs = fs.readFileSync(UPDATE_LOG, 'utf-8').trim().split('\n');
    return logs[logs.length - 1];
  } catch {
    return null;
  }
}

// 自动模式（心跳调用）
function autoUpdate() {
  // 检查今天是否已检查过
  const lastCheck = getLastUpdate();
  if (lastCheck) {
    const lastDate = lastCheck.slice(1, 11); // [YYYY-MM-DD
    const today = new Date().toISOString().slice(0, 10);
    if (lastDate === today) {
      // 今天已检查，跳过
      return;
    }
  }
  
  // 静默检查更新
  const result = run('git fetch origin', SKILL_DIR, true);
  if (!result.success) return;
  
  const localHash = run('git rev-parse HEAD', SKILL_DIR, true).output;
  const remoteHash = run('git rev-parse origin/main', SKILL_DIR, true).output;
  
  if (localHash && remoteHash && localHash !== remoteHash) {
    // 有更新，记录日志，但不自动拉取（避免打断用户）
    logUpdate('发现新版本，待更新');
    console.log('📦 Token Optimizer 有新版本可用，运行 `npx token-optimizer update` 更新');
  } else {
    logUpdate('已是最新版本');
  }
}

// CLI 入口
const args = process.argv.slice(2);
const command = args[0];
const force = args.includes('--force');

if (command === 'check-update') {
  checkUpdate();
} else if (command === 'update') {
  if (force) {
    // 强制更新：先重置本地修改
    run('git checkout -- .', SKILL_DIR);
  }
  update(false);
} else if (command === 'auto') {
  autoUpdate();
} else if (command === 'version') {
  console.log('v' + getCurrentVersion());
} else if (command === 'changelog') {
  if (fs.existsSync(UPDATE_LOG)) {
    console.log(fs.readFileSync(UPDATE_LOG, 'utf-8'));
  } else {
    console.log('暂无更新记录');
  }
} else {
  console.log('⚡ Token Optimizer - 更新工具\n');
  console.log('用法:');
  console.log('  npx token-optimizer check-update  检查更新');
  console.log('  npx token-optimizer update        立即更新');
  console.log('  npx token-optimizer update --force 强制更新（覆盖本地修改）');
  console.log('  npx token-optimizer version       查看当前版本');
  console.log('  npx token-optimizer changelog     查看更新历史');
  console.log('  npx token-optimizer auto          自动检查（心跳调用）');
}
