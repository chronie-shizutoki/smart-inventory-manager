import requests
import json

# 测试智能提醒API
print("测试智能提醒API响应结构...")
response = requests.get('http://localhost:5000/api/inventory/alerts?language=zh')
print(f"状态码: {response.status_code}")

if response.status_code == 200:
    data = response.json()
    print("响应结构:")
    print(json.dumps(data, ensure_ascii=False, indent=2))
    if 'data' in data and len(data['data']) > 0:
        print("第一个提醒项结构:")
        print(json.dumps(data['data'][0], ensure_ascii=False, indent=2))
else:
    print("API调用失败")

# 测试智能推荐API
print("\n测试智能推荐API响应结构...")
response = requests.get('http://localhost:5000/api/inventory/recommendations?language=zh')
print(f"状态码: {response.status_code}")

if response.status_code == 200:
    data = response.json()
    print("响应结构:")
    print(json.dumps(data, ensure_ascii=False, indent=2))
    if 'data' in data and len(data['data']) > 0:
        print("第一个推荐项结构:")
        print(json.dumps(data['data'][0], ensure_ascii=False, indent=2))
else:
    print("API调用失败")