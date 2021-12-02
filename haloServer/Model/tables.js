const createProductTable=(connection )=>{
const sql=`CREATE TABLE IF NOT EXISTS product( id int AUTO_INCREMENT ,
    product VARCHAR(20) ,
    PRIMARY KEY(id) )`;
connection.query(sql,(err)=>{


    if(err)
    {
        console.log(err);
    }
    else{
        console.log('creation of table was successful');
    }
})
}

const createWishListTable=(connection )=>{
    const sql=`CREATE TABLE IF NOT EXISTS wishList( wishId int AUTO_INCREMENT ,
        product VARCHAR(20) ,
        userId int(3),
        PRIMARY KEY(wishId) ,
        FOREIGN KEY(userId) REFERENCES users(id))`
        ;
    connection.query(sql,(err)=>{
    
    
        if(err)
        {
            console.log(err);
        }
        else{
            console.log('creation of wishTable was successful');
        }
    })
    }
    
    const createCategoryTable=(connection )=>{
        const sql=`CREATE TABLE IF NOT EXISTS category( categoryId int AUTO_INCREMENT ,
            productCategory VARCHAR(20),
            PRIMARY KEY(categoryId) )`
         ;   
        connection.query(sql,(err)=>{
        
        
            if(err)
            {
                console.log(err);
            }
            else{
                console.log('creation of categoryTable was successful');
            }
        })
        }
        const createFedbackTable=(connection )=>{
            const sql=`CREATE TABLE IF NOT EXISTS feedback(feedbackId int AUTO_INCREMENT ,
                feedback VARCHAR(20) ,
                rating int(1),
                userId int(3),
                productId int(3),
                PRIMARY KEY(feedbackId) ,
                FOREIGN KEY(productId) REFERENCES product(id))`
                ;
            connection.query(sql,(err)=>{
            
            
                if(err)
                {
                    console.log(err);
                }
                else{
                    console.log('creation of feedbackTable was successful');
                }
            })
            }
            const createOrdersTable=(connection )=>{
                const sql=`CREATE TABLE IF NOT EXISTS orders(orderId int AUTO_INCREMENT ,
                    productName VARCHAR(20) ,
                    rating int(1),
                    price int(9),
                    orderDate DATE NOT NULL ,
                    shipped boolean default false,
                    userId int(3),
                    PRIMARY KEY(orderId) ,
                    FOREIGN KEY(userId) REFERENCES users(id))`
                    ;
                connection.query(sql,(err)=>{
                
                
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        console.log('creation of orderTable was successful');
                    }
                })
                }
        
    



module.exports={createProductTable,createWishListTable,createCategoryTable,createFedbackTable,createOrdersTable };
