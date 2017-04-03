/*
 * 150円のりんごを１つ買う関数
 * Note: 買い物には1秒かかる
 *
 * @param  支払い金額
 * @return おつり金額
 * @error  金額不足
 */
var promiseBuyApple = payment => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (payment >= 150) {
                resolve(payment-150)
            } else {
                reject('金額が足りません。')
            }
        }, 1000)
    })
}


/*
 * 1個りんごを買う
 */
var buyOne = () => {
    promiseBuyApple(400)
        .then(change=>console.log('buyOne: おつりは' + change + '円です'))
        .catch(error=>console.log('エラーが発生しました：' + error));
}

/*
 * 逐次的にりんごを買う
 */
var buyMany = () => {
    // たくさん買うと時間がかかる
    setTimeout(()=> {
        promiseBuyApple(400).then(change=>{
            console.log('buyMany: おつりは' + change + '円です');
            return promiseBuyApple(change);
        }).then(change=>{
            console.log('buyMany: おつりは' + change + '円です');
            return promiseBuyApple(change);
        }).then(change=>{
            console.log('buyMany: おつりは' + change + '円です');
        }).catch(error=>{
            console.log('buyMany: エラーが発生しました：' + error);
        });
    }, 1000)
}

/*
 * 非同期で3個買う
 * 全て買いきったら店を出る
 */
var buyManyPromiseAll = () => {
    Promise.all([
            promiseBuyApple(400),
            promiseBuyApple(300),
            promiseBuyApple(500),
        ]).then(changes =>{
            console.log('buyManyPromiseAll: 1個目: おつりは' + changes[0] + '円です')
            console.log('buyManyPromiseAll: 2個目: おつりは' + changes[1] + '円です')
            console.log('buyManyPromiseAll: 3個目: おつりは' + changes[2] + '円です')
            console.log('buyManyPromiseAll: 店を出ました')
        }).catch(error=>{
            console.log('buyManyPromiseAll: エラーが発生しました：' + error)
        })
}

buyMany()
buyOne()
buyManyPromiseAll()
