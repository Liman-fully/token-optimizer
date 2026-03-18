---
name: token-optimizer
version: 1.0.0
description: |
  OpenClaw Token 优化 Skill — 非程序员友好版。
  纯 prompt 层面优化，不依赖技术配置，任何 OpenClaw 部署都能用。
  综合社区最佳实践，可将 Token 消耗降低 30-60%，同时提升响应准确率。
metadata:
  openclaw:
    emoji: "⚡"
    always: false
    tags:
      - token
      - optimization
      - cost
      - performance
      - accuracy
  author:
    name: "小满 (Xiaoman)"
    github: "Liman-fully"
    email: "Liman.fully@gmail.com"
    wechat: "Leon_992"
    community: "The Lab 青年实验室"
  sources:
    - https://github.com/wassupjay/OpenClaw-Token-Optimization
    - https://github.com/oneles/openclaw-token-optimization
    - https://github.com/SiruGao/token-saver
    - https://github.com/xdylanbaker/memory-hygiene
    - https://github.com/PredicateSystems/openclaw-predicate-skill
---

# ⚡ Token Optimizer

> OpenClaw Token 优化指南 — 非程序员友好版，纯 prompt 层面优化，任何部署都能用。

---

## 为什么需要这个 Skill？

Token 消耗太快，不仅花钱，更是对计算资源的浪费。

这个 Skill 的目标很简单：
- ✅ 帮你省钱
- ✅ 提升响应效率
- ✅ 减少不必要的计算消耗
- ✅ 为地球节约一点能源

**不依赖技术配置，纯 prompt 规则，任何 OpenClaw 部署都能生效。**

---

## 📊 优化效果

| 优化维度 | 节省幅度 | 门槛 |
|---------|---------|------|
| 消除填充词 | 每次 20-50 tokens | 零门槛 |
| 回复长度匹配复杂度 | 30-40% | 零门槛 |
| 工具调用合并 | 40-60% | 零门槛 |
| 会话启动精简 | 80% | 零门槛 |
| 心跳精简 | 100%（心跳成本） | 零门槛 |
| 对话压缩 | 40-60% | 零门槛 |
| 记忆清理 | 20-40% | 低门槛 |

**综合效果：30-60% 的 Token 节省**

---

## 一、消除填充词（最简单有效）

### 规则

```
❌ 禁止使用：
- "好的，我来帮你..."
- "当然！这是一个很好的问题..."
- "我很乐意帮助你..."
- "让我来为你解释一下..."
- "总结一下，..."（结尾重复总结）

✅ 直接给出答案或行动
```

**效果：每次回复节省 20-50 tokens**

---

## 二、回复长度匹配复杂度

### 规则

```
简单问题 → 1-3 句话
中等问题 → 1-3 段落
复杂问题 → 结构化回复（带标题）
代码任务 → 只输出代码 + 必要说明
```

**效果：节省 30-40% 的输出 tokens**

---

## 三、工具调用合并

### 规则：能合并就合并

```bash
# ❌ 低效：3 次工具调用
exec("ls")
exec("cat file.txt")
exec("pwd")

# ✅ 高效：1 次工具调用
exec("pwd && ls && cat file.txt")
```

### 规则：避免冗余读取

```
❌ 每次都重新读取同一文件
✅ 读取一次，在对话中复用内容

❌ 用 exec 验证刚刚写入的内容
✅ 相信写入操作，除非有错误信号

❌ 连续多次 memory_search 查同一主题
✅ 一次搜索，提取所需信息
```

**效果：减少 40-60% 的工具调用 overhead**

---

## 四、会话启动精简

### 只加载必要文件

```
✅ 必须加载：
- SOUL.md（身份核心）
- USER.md（用户信息）
- memory/[今天].md（今日上下文）

❌ 按需加载（不要自动加载）：
- MEMORY.md → 用 memory_search() 按需检索
- 历史会话记录 → 用户明确要求时才加载
- 所有 skill 文件 → 任务需要时才读取
```

**效果：减少 80% 的会话启动 Token 消耗**

---

## 五、心跳（Heartbeat）精简

### 规则：HEARTBEAT.md 保持精简

```markdown
# 最佳实践

# 空文件 = 直接回复 HEARTBEAT_OK（零消耗）
# 只在真正需要时添加检查项

# 示例：
- 检查紧急邮件（每天最多 2 次）
- 检查 24h 内的日历事件（早上 8 点）
```

**效果：心跳几乎零消耗**

---

## 六、对话压缩

### 规则：超过 8 轮对话后压缩历史

- 只保留关键决策和结论
- 工具输出截断：保留前 50 行 + 后 20 行
- 重要信息写入文件，不依赖对话记忆

**效果：长对话节省 40-60%**

---

## 七、记忆清理

### 定期清理原则

```
每周：
1. 删除 30 天前的 memory 日志
2. 提炼重要内容到 MEMORY.md

每月：
1. 删除 MEMORY.md 中的低价值条目
2. 合并重复信息
```

### 置信度评分

存储记忆时标注置信度：

```
0.9-1.0 → 用户直接说明的事实
0.7-0.9 → 强推断，已确认
0.5-0.7 → 合理推断，未确认
< 0.5   → 谨慎使用
```

**效果：减少 20-40% 的无效记忆召回**

---

## 八、准确率提升

### 明确任务目标

```
✅ 好的描述：
"把 data.csv 按月份汇总，输出到 summary.md，
格式：月份 | 总销售额 | 环比增长"

❌ 模糊描述：
"帮我处理一下数据"
```

### 分步执行

```
复杂任务 → 拆分为 3-5 个子任务
每个子任务完成后确认结果
避免过长操作链
```

---

## 九、自检清单

```
✅ 回复是否消除了填充词？
✅ 回复长度是否匹配问题复杂度？
✅ 工具调用是否合并了？
✅ HEARTBEAT.md 是否精简？
✅ 是否定期清理了旧记忆？
```

---

## 自动更新

本 Skill 内置自动更新机制，每天检查一次新版本。

### 手动更新

```bash
# 检查更新
npx token-optimizer check-update

# 更新到最新版本
npx token-optimizer update

# 强制更新（覆盖本地修改）
npx token-optimizer update --force

# 查看当前版本
npx token-optimizer version

# 查看更新历史
npx token-optimizer changelog
```

### 自动更新（心跳触发）

在 `HEARTBEAT.md` 中添加一行即可启用自动检查：

```markdown
# 每天自动检查更新
- 运行 npx token-optimizer auto
```

**工作原理：**
1. 每天闲时（心跳触发时）自动检查 GitHub
2. 发现新版本 → 记录日志，下次对话时提示用户
3. 用户确认后 → 自动拉取更新（备份本地修改）
4. 更新完成 → AI 告知用户版本变更

**冲突处理：**
- 如果用户本地修改了 skill 文件 → 跳过自动更新，提示手动处理
- 更新前自动备份到 `.backups/` 目录
- 支持 `--force` 强制更新（覆盖本地修改）

**并发安全：**
- Git pull 本身是原子的，多用户同时更新不会冲突
- 每个用户独立克隆，互不影响

---

## 贡献指南

欢迎一起迭代！

1. Fork 本仓库
2. 在 `references/` 目录添加你的优化案例
3. 更新 SKILL.md
4. 提交 PR

**让每个人都能受益于更好的优化经验。**

---

## 作者

**小满 (Xiaoman)**

- 90 后，Base 伦敦
- 某头部科技公司 HR 业务管理，8 年经验
- The Lab 青年实验室 创始人

联系方式：
- 微信：Leon_992
- 邮箱：Liman.fully@gmail.com
- GitHub：[Liman-fully](https://github.com/Liman-fully)
- 社区：[The Lab 青年实验室](https://github.com/Liman-fully)

---

## 参考来源

本 Skill 聚合自以下社区项目：

- [wassupjay/OpenClaw-Token-Optimization](https://github.com/wassupjay/OpenClaw-Token-Optimization)
- [oneles/openclaw-token-optimization](https://github.com/oneles/openclaw-token-optimization)
- [SiruGao/token-saver](https://github.com/SiruGao/token-saver)
- [xdylanbaker/memory-hygiene](https://github.com/xdylanbaker/memory-hygiene)
- [PredicateSystems/openclaw-predicate-skill](https://github.com/PredicateSystems/openclaw-predicate-skill)
