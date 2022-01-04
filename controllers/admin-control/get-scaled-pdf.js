import Order from '../../models/order.js';

const splitDim = (dim) => {
    const arr = dim.split('x');
    const width = arr[0];
    const height = arr[1];
    return {width, height};
}

const getScaled = async (req, res, next) => {

    const {page, dimenssion} = req.body;

    let existingOrders;
    let filtered = [];
    let orders = [];
    let ordersFiltered = {};
    let numberOfElements = 0;
    try {
        existingOrders = await Order.find(function (err, res) {return res});
        existingOrders.map(item => {
                filtered.push(item.order)
        });
        filtered.map(item => {
            item.map(child => {
                orders.push(child);
            })
        })
        orders = orders.filter(item => {if(item.isPrinted == false) return item})
        orders.forEach((item, index) => {
            if(index > (page-1)*8 && index < page*8){
            let dim = splitDim(item.dim);
            if(numberOfElements < 5) {
                if(dim.width == '14') {
                    if(numberOfElements%2 == 0){
                        numberOfElements = numberOfElements+2;
                        ordersFiltered[`ZONA_BIG_${parseInt(numberOfElements/2)}`] = {isCompleted: true, products: [item]};
                    } else {
                        numberOfElements = numberOfElements+2;
                        ordersFiltered[`ZONA_BIG_${parseInt((numberOfElements+1)/2)}`] = {isCompleted: true, products: [item]};
                    }
                } else if(dim.width == '13') {
                    if(numberOfElements%2 == 0) {
                        numberOfElements++;
                        ordersFiltered[`ZONA_SMALL_${parseInt((numberOfElements+1)/2)}`] = {isCompleted: false, products: [item]};
                    } else {
                        Object.keys(ordersFiltered).map(list => {

                            if(list.includes('ZONA_SMALL_') && ordersFiltered[list].isCompleted == false ) {
                                numberOfElements++;
                                ordersFiltered[list].isCompleted = true;
                                ordersFiltered[list].products.push(item);
                            }
                        });
                    }
                    
                } else {
                    
                    console.log('incorrect dimenssion')
                }
            // }
            // return ordersFiltered;
            }
        }   
        })
        
        console.log(ordersFiltered);
          

    } catch (err) {
        return err
    }
    res.json(orders)
}

export default getScaled;