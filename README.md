# ⚡ token-optimizer

[English](#english) | [中文](#中文)

---

<a name="中文"></a>

## 中文

### OpenClaw Token 优化 Skill — 非程序员友好版

**纯 prompt 层面优化，任何 OpenClaw 部署都能用。**

---

### 为什么做这个项目？

我是小满，一个非技术背景的 OpenClaw 用户。

日常使用中发现 Token 消耗很快，不仅花钱，更是对计算资源的浪费。我就在想：有没有什么方法，能让普通用户也能轻松优化 Token 消耗？

于是我整理了社区的最佳实践，提炼出这套**纯 prompt 规则**的优化方案——不需要技术配置，不需要改底层代码，任何 OpenClaw 部署都能直接生效。

**希望这个项目能帮到更多人：省钱、提效、减少资源浪费。**

---

### 效果

| 优化维度 | 节省幅度 |
|---------|---------|
| 消除填充词 | 每次 20-50 tokens |
| 回复长度匹配 | 30-40% |
| 工具调用合并 | 40-60% |
| 会话启动精简 | 80% |
| 心跳精简 | 100%（心跳成本） |
| 对话压缩 | 40-60% |

**综合效果：30-60% 的 Token 节省**

---

### 安装

```bash
# 方式一：通过 ClawHub
npx clawhub@latest install token-optimizer

# 方式二：手动安装
git clone https://github.com/Liman-fully/token-optimizer ~/.openclaw/workspace/skills/token-optimizer
```

---

### 作者

**小满**

- 90 后，Base 伦敦
- 某头部科技公司 HR 业务管理，8 年经验
- **The Lab 青年实验室** 创始人

**联系方式：**
- 微信：Leon_992
- 邮箱：Liman.fully@gmail.com
- GitHub：[Liman-fully](https://github.com/Liman-fully)

---

### 支持这个项目

如果你觉得这个项目有帮助，欢迎请我喝杯咖啡 ☕

![微信收款码](assets/wechat-pay.png)

**海外用户：**

![Revolut](assets/revolut-pay.png)

**你的支持是我持续迭代的动力！**

---

### 自动更新

本 Skill 每天自动检查更新，你也可以手动操作：

```bash
# 检查更新
npx token-optimizer check-update

# 立即更新
npx token-optimizer update

# 查看版本
npx token-optimizer version
```

**更新机制：**
- 每天自动检查 GitHub 新版本
- 发现更新时提示用户，确认后自动拉取
- 更新前自动备份，支持回滚
- 用户本地修改不会丢失（冲突时提示手动处理）

---

<a name="english"></a>

## English

### OpenClaw Token Optimiser — No-Code Friendly

**Pure prompt-level optimisation. Works with any OpenClaw deployment.**

---

### Why This Project?

Hi, I'm Xiaoman. I'm not a developer—I work in HR at a tech company in London.

When I started using OpenClaw daily, I noticed token consumption was surprisingly high. It wasn't just about the cost; it felt wasteful. All those tokens mean more compute, more energy, more resources burned.

I wondered: could there be a way for *non-technical users* like me to reduce this waste?

So I studied the best practices from the community and distilled them into this skill—**pure prompt rules that require zero technical configuration**. No code changes, no system tweaks. Just smarter prompts that any OpenClaw deployment can use immediately.

My hope is simple:
- Help users save money
- Improve response efficiency
- Reduce unnecessary compute
- Contribute, in a small way, to reducing energy consumption

**Every token saved is a small win for your wallet—and for the planet.**

---

### Results

| Optimisation | Savings |
|-------------|---------|
| Remove filler words | 20-50 tokens per reply |
| Match response length to complexity | 30-40% |
| Combine tool calls | 40-60% |
| Minimise session startup | 80% |
| Lean heartbeat | 100% (heartbeat cost) |
| Compress long conversations | 40-60% |

**Overall: 30-60% token reduction**

---

### Installation

```bash
# Option 1: Via ClawHub
npx clawhub@latest install token-optimizer

# Option 2: Manual
git clone https://github.com/Liman-fully/token-optimizer ~/.openclaw/workspace/skills/token-optimizer
```

---

### About the Author

**Xiaoman**

- 90s baby, based in London
- 8 years in HR management at a leading tech company
- Founder of **The Lab** — a global youth community for personal growth

**Get in touch:**
- WeChat: Leon_992
- Email: Liman.fully@gmail.com
- GitHub: [Liman-fully](https://github.com/Liman-fully)

---

### Support This Project

If this project helped you, consider buying me a coffee ☕

![WeChat Pay](assets/wechat-pay.png)

**International:**

![Revolut](assets/revolut-pay.png)

**Your support keeps this project going!**

---

### Auto-Update

This skill checks for updates automatically every day. You can also update manually:

```bash
# Check for updates
npx token-optimizer check-update

# Update now
npx token-optimizer update

# View version
npx token-optimizer version
```

**How it works:**
- Automatically checks GitHub for new versions daily
- Prompts you when updates are available
- Backs up before updating
- Preserves your local customisations (warns on conflict)

---

## License

MIT

---

## Sources

This skill aggregates learnings from:

- [wassupjay/OpenClaw-Token-Optimization](https://github.com/wassupjay/OpenClaw-Token-Optimization)
- [oneles/openclaw-token-optimization](https://github.com/oneles/openclaw-token-optimization)
- [SiruGao/token-saver](https://github.com/SiruGao/token-saver)
- [xdylanbaker/memory-hygiene](https://github.com/xdylanbaker/memory-hygiene)
- [PredicateSystems/openclaw-predicate-skill](https://github.com/PredicateSystems/openclaw-predicate-skill)

**Community-powered. Always improving.**
