import { useState, useRef, useMemo } from 'react'
import { useVirtualList } from 'ahooks'

// 虚拟长列表：react-window 和 react-virtualized
// 演示：ahooks中的 useVirtualList()
// Tree组件优化（使用虚拟滚动、用算法来优化）

import Quill from '@/components/quill'

const list = [
  { id: 1, pid: -1, text: '广东' },
  { id: 2, pid: -1, text: '广西' },
  { id: 3, pid: 1, text: '深圳' },
  { id: 4, pid: 2, text: '桂林' },
  { id: 5, pid: 3, text: '宝安区' },
  { id: 6, pid: 5, text: '西部硅谷' }
]
// 把一维数据转化成树结构

export default () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const originalList = useMemo(() => Array.from(Array(99999).keys()), []);

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 20,
  });
  return (
    <>
      {/* 富文本框 */}
      <Quill
        height={350}
        onChange={ev=>{
          console.log('---取值', ev)
        }}
      />
      <div
        ref={containerRef}
        style={{
          height: '500px',
          overflow: 'auto',
          border: '1px solid'
        }}
      >
        <div ref={wrapperRef} style={{height: '600px'}}>
          {list.map((ele, idx) => (
            <div
              key={ele.index}
              style={{
                height: 60,
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                // marginBottom: 8,
              }}
            >
              Row:  { ele.index }
            </div>
          ))}
        </div>


      </div>
    </>
  );
};
