# 社区案例：模型路由实测

## 场景
日常聊天 + 偶发复杂任务的混合使用场景

## 方法
按复杂度分 3 级路由：
- Level 1（简单）→ Haiku / 快速模型
- Level 2（中等）→ Sonnet / 标准模型  
- Level 3（复杂）→ Opus / 最强模型

## 实测效果
- 测试环境：OpenClaw 日常使用，约 50 条消息/天
- 节省比例：约 70%（相比全程使用 Sonnet）
- 备注：70% 的消息属于 Level 1，只有约 5% 需要 Level 3

## 来源
https://github.com/SiruGao/token-saver

---

# 社区案例：心跳间隔 55 分钟

## 场景
使用 Anthropic 模型，开启 Prompt Cache

## 方法
将心跳间隔设为 55 分钟（略低于 Anthropic 缓存 1 小时 TTL）

## 实测效果
- 缓存命中率：接近 100%（系统 prompt 几乎永远命中缓存）
- 节省比例：重复内容节省约 90%
- 备注：需要 Anthropic 模型支持 Prompt Cache

## 来源
https://github.com/oneles/openclaw-token-optimization

---

# 社区案例：HEARTBEAT.md 保持空文件

## 场景
不需要定期主动检查的用户

## 方法
保持 HEARTBEAT.md 为空文件（只有注释）

## 实测效果
- 心跳直接返回 HEARTBEAT_OK，几乎零 Token 消耗
- 节省比例：100%（心跳成本）

## 来源
OpenClaw 官方文档 + 社区经验
