# 智能家庭库存管理系统

一个现代化的家庭库存管理网页应用，支持多语言和智能化功能。

## 🌟 功能特性

### 核心功能
- **库存管理**：添加、编辑、删除和查看家庭物品
- **分类管理**：支持食品、药品、清洁用品、个人护理、家居用品、电子产品等分类
- **搜索功能**：快速搜索物品名称和描述
- **过期日期管理**：设置和追踪物品过期日期

### 智能化功能
- **智能提醒**：
  - 过期物品提醒
  - 即将过期物品预警（3天内）
  - 库存不足提醒
- **智能推荐**：
  - 基于库存状况的采购建议
  - 使用频率分析推荐

### 多语言支持
- 🇨🇳 中文 (简体)
- 🇺🇸 English
- 🇯🇵 日本語

### 技术特性
- **响应式设计**：支持桌面和移动设备
- **现代化界面**：使用 Tailwind CSS 和 Font Awesome 图标
- **实时数据**：前后端分离架构，实时数据同步
- **数据持久化**：SQLite 数据库存储

## 🚀 在线演示

访问地址：[https://xlhyimclenwm.manus.space](https://xlhyimclenwm.manus.space)

## 🛠️ 技术栈

### 前端
- **Vue.js 3**：渐进式JavaScript框架
- **Vue I18n**：国际化支持
- **Tailwind CSS**：现代化CSS框架
- **Font Awesome**：图标库
- **原生JavaScript**：核心逻辑实现

### 后端
- **Python Flask**：轻量级Web框架
- **SQLAlchemy**：ORM数据库操作
- **Flask-CORS**：跨域请求支持
- **SQLite**：轻量级数据库

## 📁 项目结构

```
smart-inventory-manager/
├── frontend/                 # 前端源码
│   ├── index.html           # 主页面
│   └── app.js              # Vue.js应用逻辑
├── backend/                 # 后端源码
│   └── inventory-api/       # Flask API服务
│       ├── src/
│       │   ├── main.py     # Flask应用入口
│       │   ├── models/     # 数据模型
│       │   │   ├── user.py
│       │   │   └── inventory.py
│       │   ├── routes/     # API路由
│       │   │   ├── user.py
│       │   │   └── inventory.py
│       │   └── static/     # 静态文件（前端部署）
│       ├── venv/           # Python虚拟环境
│       └── requirements.txt # Python依赖
├── README.md               # 项目说明
└── todo.md                # 开发任务清单
```

## 🔧 本地开发

### 环境要求
- Python 3.11+
- 现代浏览器（支持ES6+）

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd smart-inventory-manager
```

2. **设置后端环境**
```bash
cd backend/inventory-api
# 创建虚拟环境
python -m venv venv
# 激活虚拟环境
source venv/bin/activate  # Linux/Mac
# 或 venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

3. **启动后端服务**
```bash
python src/main.py
```

4. **访问应用**
- 本地访问：打开浏览器访问 http://localhost:5000
- 局域网访问：在同一网络中的其他设备上，使用运行服务器的计算机IP地址访问，例如 http://192.168.1.100:5000

  > 提示：可以通过以下方式查找本地IP地址
  > - Windows：在命令提示符中输入 `ipconfig` 查找 IPv4 地址
  > - Linux/Mac：在终端中输入 `ifconfig` 或 `ip addr` 查找 IPv4 地址

## 📊 数据库设计

### 主要数据表

#### inventory_items（库存物品表）
- `id`：主键
- `name`：物品名称
- `category`：分类
- `quantity`：数量
- `unit`：单位
- `min_quantity`：最低库存
- `expiry_date`：过期日期
- `description`：描述
- `created_at`：创建时间
- `updated_at`：更新时间

## 🌐 API接口

### 库存管理接口
- `GET /api/inventory/items` - 获取物品列表
- `POST /api/inventory/items` - 创建新物品
- `PUT /api/inventory/items/{id}` - 更新物品
- `DELETE /api/inventory/items/{id}` - 删除物品
- `GET /api/inventory/stats` - 获取统计数据
- `GET /api/inventory/alerts` - 获取智能提醒
- `GET /api/inventory/recommendations` - 获取智能推荐

## 🎨 界面预览

### 主要页面
1. **库存列表页**：显示所有物品，支持搜索和筛选
2. **添加物品页**：添加新物品到库存
3. **智能分析页**：显示智能提醒和推荐

### 主要功能
- 多语言切换
- 响应式布局
- 实时数据更新
- 智能状态提示

## 🔮 未来规划

- [ ] 移动端APP开发
- [ ] 条码扫描功能
- [ ] 数据导入导出
- [ ] 用户权限管理
- [ ] 数据可视化图表
- [ ] 采购清单生成

## 👥 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者，特别是：
- Vue.js团队
- Flask团队
- Tailwind CSS团队

---

**开发者**: quiettime  
**项目状态**: ✅ 已完成基础功能  
**最后更新**: 2025年8月3日

