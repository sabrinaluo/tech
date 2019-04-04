---
title: 快速排序
date: 2019-04-04 23:41:10
tags: [sort, qsort, 快排]
category: Algorithm
---
算法渣渣的我，一直不理解，为什么我们要学排序算法，毕竟这么多年的前端工作中，没有什么是一句 `Array.prototype.sort` 解决不了的排序，如果有，那就来两句！

看了入门算法书，我的脑子就是比较线性不抽象的，但凡涉及到递归我就开始无法理解了:(，至于为啥会有排序算法，我的理解是，数据结构和排序是搜索的基石，正确的数据结构搭配恰当的排序算法能让搜索事半功倍，不过我们前端还是不太用得到这些知识吧，虽然各种framework，比如react的virtual dom diff应该是用到了，但我们写application的，还是用不到啊。

### 正题
快速排序是基于分治（divide and conquer）的思想，通俗的说就是中国人常说的“大事化小，小事化了”。

总的来说快排的过程非常简单，将数组递归分割为**基准值**，**小于基准值的部分**，**大于基准值的部分**，
1. 选择基准值
2. 将比基准值小的都排在前面
3. 将比基准值大的都排在后面
4. 针对2, 3持续重复1-3步，直到可分割的数组只包含零个或一个元素

```javascript
const qsort = arr => {
  if (arr.length <= 1) return arr; // 基线条件

  // 用于储存分割数组
  const left = [];
  const right = [];

  const pivotIndex = 0;
  const [pivot] = arr.splice(pivotIndex, 1); // 选取基准值

  // 分割数组
  arr.forEach(i => {
    if (i < pivot) {
      left.push(i)
    } else {
      right.push(i)
    }
  })

  // 递归分割已分割数组
  return [...qsort(left), pivot, ...qsort(right)]
}
```

以上是最基本的快排，需要占用额外的两个数组空间。

在学习快排的过程中，还了解到了快排的优化版本，以及其他的实现方法，比如填坑法，基于交换的快排等等，暂时还没看明白:( 再接再厉！