title: 对Promise中的resolve，reject，catch的理解
date: 2015-12-22 11:36:07
tags: [promise chain, promise链]
---
对promise这个概念之前已经有了一些浅显的理解，[相关文章->戳这里](http://sabrinaluo.com/tech/2015/12/01/promise/)，最近又有了一些新的理解。

### .then()的时候到底是在then什么…
* 首先要理解…Promise是一个对象，有then()方法的对象
* then()的入参是一个函数，通常在promise链中，入参是**一个返回promise的函数**，这句话好像有点拗口，就是说入参是一个函数，这个函数会return一个promise对象

### 如何破坏promise链
如果有这样一个promise链：

```
p1().then(p2).then(p3)
  .then(function(data) {
    console.log('data: ' + data);
  })
  .catch(function(error) {
    console.log('error: ' + error);
  });

function p1() {
  return new Promise(function(resolve, reject) {
    console.log('p1 resolved');
    resolve(123);
  });
}

function p2() {
  return new Promise(function(resolve, reject) {
    console.log('p2 rejected');
    reject(456);
  });
}

function p3() {
  return new Promise(function(resolve, reject) {
    console.log('p3 resolved');
    resolve(789);
  });
}
```

上面这个例子，你看到的console.log会是这样：
```
p1 resolved
p2 rejected
error: 456
```
并没有看到`p3`的log，而是看到了error message，也就是说：

**在一个promise链中，只要任何一个promise被reject，promise链就被破坏了，reject之后的promise都不会再执行，而是直接调用`.catch`方法**。

这也是为什么在standard practice中，一定要在最后加上`.catch`的原因。通过`.catch`能够清楚的判断出promise链在哪个环节出了问题。

### 如何按顺序执行已经定义的promise
这个情况在什么时候会用到呢？比如你有一个队列，队列里有很多任务，这些任务并不互相依赖执行后返回的结果。每个任务完成的时间都是不确定的，并且计算资源只允许一次执行一个任务。简单的来说，就是**做完A之后再去做B，并且AB是相互独立的**

假如我现在有一堆promise对象，大概长这样：
```
//p2, p3与p1相似
//当doSomething()执行完毕的时候，调用resolve()
//使得当前promise状态转变为fulfilled即可
var p1 = new Promise(function(resolve, reject) {
  //do something here
  //when do something done
  resolve();
});

p1.then(function() {
    return p2
  })
  .then(function() {
    return p3
  })
  .catch()
```
> 请注意，前一部破坏Promise链中分定义的p1 p2 p3是**函数**，而此部分定义的p1 p2 p3是**对象！对象！对象！**

* 如前面提到，promise是一个有then方法的对象，因此p1可以直接调用then
Q:为什么开头调用不是`p1().then`？
A: 因为p1是一个对象啊！！！对象啊！！！象啊！！！啊！！！
* 然而promise链中then方法的入参是**一个返回promise对象的函数**，p2并不是一个函数，因此不能then(p2)；
* 但p2是一个promise对象，已经满足了then方法入参的一半需求，那么写一个函数并且返回p2，就满足了入参的全部需求
