import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 检测浏览器是否支持WebAssembly
const isWebAssemblySupported = (): boolean => {
  try {
    // 检查WebAssembly全局对象是否存在
    if (typeof WebAssembly !== 'object') {
      return false
    }
    
    // 检查基本的WebAssembly功能是否可用
    if (typeof WebAssembly.compile !== 'function' || 
        typeof WebAssembly.instantiate !== 'function') {
      return false
    }
    
    // 尝试创建一个简单的WebAssembly模块进行更深入的检查
    const wasmCode = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00])
    
    try {
      // 如果浏览器支持，WebAssembly.compile不会抛出异常
      // 但我们不需要实际编译，只需要检查是否会抛出异常
      // 使用Promise.resolve()来避免异步检查的复杂性
      if (WebAssembly.compile && typeof WebAssembly.compile === 'function') {
        return true
      }
    } catch (e) {
      return false
    }
    
    return true
  } catch (error) {
    return false
  }
}

// 浏览器不支持WebAssembly时的提示组件
const BrowserNotSupported = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full border-2 border-black p-8">
        <div className="flex items-center mb-8">
          <img src="/icon.png" alt="BandBurg Logo" className="w-12 h-12 mr-4" />
          <h1 className="text-3xl font-bold tracking-tight">BANDBURG</h1>
        </div>
        
        <div className="border border-black p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-xl font-bold mr-3">
              ⚠️
            </div>
            <h2 className="text-2xl font-bold">浏览器兼容性提示</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              检测到当前浏览器<strong className="font-bold">不支持WebAssembly</strong>，这将影响BandBurg的正常使用。
            </p>
            
            <div className="border-l-4 border-black pl-4 py-2 bg-gray-50">
              <p className="font-bold mb-1">WebAssembly的作用：</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>实现高性能的设备通信和数据处理</li>
                <li>支持表盘和应用的安装管理</li>
                <li>提供稳定可靠的设备连接</li>
                <li>启用所有核心功能模块</li>
              </ul>
            </div>
            
            <div className="border border-black p-4 mt-6">
              <h3 className="text-xl font-bold mb-3">推荐解决方案</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-black p-4">
                  <h4 className="font-bold mb-2">Google Chrome</h4>
                  <p className="text-sm mb-3">完全支持WebAssembly和Web Bluetooth API</p>
                </div>
                <div className="border border-black p-4">
                  <h4 className="font-bold mb-2">Microsoft Edge</h4>
                  <p className="text-sm mb-3">基于Chromium，完全兼容WebAssembly</p>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mt-6 pt-4 border-t border-gray-300">
              <p><strong>其他兼容浏览器：</strong> Firefox 52+、Safari 11+ 也支持WebAssembly，但Web Bluetooth API支持可能有限。</p>
              <p className="mt-2"><strong>注意：</strong> BandBurg需要同时支持WebAssembly和Web Bluetooth API才能正常工作。</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => window.location.reload()}
            className="border-2 border-black bg-white text-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors mr-4"
          >
            重新检测
          </button>
          <button 
            onClick={() => {
              // 即使不支持WebAssembly也尝试加载应用（部分功能可能可用）
              // 在实际场景中，这可能不是最佳做法，但为用户提供选择
              const root = document.getElementById('root')
              if (root) {
                ReactDOM.createRoot(root).render(
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                )
              }
            }}
            className="bg-black text-white px-6 py-3 font-bold hover:opacity-90 transition-opacity"
          >
            继续使用（功能受限）
          </button>
        </div>
      </div>
    </div>
  )
}

// 主渲染函数
const renderApp = () => {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    console.error('找不到根元素 #root')
    return
  }

  const root = ReactDOM.createRoot(rootElement)

  if (!isWebAssemblySupported()) {
    root.render(<BrowserNotSupported />)
  } else {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
}

// 初始化应用
renderApp()