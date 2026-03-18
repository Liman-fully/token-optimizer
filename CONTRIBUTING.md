# 贡献指南 | Contributing Guide

[中文](#中文) | [English](#english)

---

<a name="中文"></a>

## 中文

感谢你愿意为 Token Optimizer 贡献经验！

### 贡献方式

#### 1. 添加优化案例

在 `references/` 目录创建 Markdown 文件：

```markdown
# [优化技巧名称]

## 场景
描述在什么情况下适用

## 方法
具体怎么做（越具体越好）

## 实测效果
- 测试环境：（OpenClaw 版本、模型、使用场景）
- 节省比例：XX%
- 备注：

## 来源
（可选）原始参考链接
```

#### 2. 更新 SKILL.md

如果你的经验值得加入主文档：
1. 找到对应章节
2. 添加你的规则或建议
3. 在 PR 描述中说明优化效果

#### 3. 提 Issue

- 发现某条规则不准确或有副作用
- 有新的优化思路但不确定如何表达
- 发现社区里有好的参考项目

### PR 规范

- 标题格式：`[维度] 简短描述`
- 保持 SKILL.md 的结构清晰
- 有实测数据的 PR 优先合并

### 行为准则

- 尊重所有贡献者
- 引用他人工作时注明来源
- 保持友好、开放的讨论氛围

---

<a name="english"></a>

## English

Thank you for contributing to Token Optimiser!

### How to Contribute

#### 1. Add Optimisation Cases

Create a Markdown file in `references/`:

```markdown
# [Optimisation Name]

## Scenario
When does this apply?

## Method
Specific steps (the more specific, the better)

## Results
- Environment: (OpenClaw version, model, use case)
- Savings: XX%
- Notes:

## Source
(Optional) Original reference link
```

#### 2. Update SKILL.md

If your insight belongs in the main document:
1. Find the relevant section
2. Add your rules or suggestions
3. Describe the optimisation effect in your PR

#### 3. Open an Issue

- A rule seems inaccurate or has side effects
- You have optimisation ideas but aren't sure how to express them
- You found a useful community project to reference

### PR Guidelines

- Title format: `[Category] Brief description`
- Keep SKILL.md structure clean
- PRs with real test data get priority

### Code of Conduct

- Respect all contributors
- Credit original sources
- Keep discussions friendly and open
