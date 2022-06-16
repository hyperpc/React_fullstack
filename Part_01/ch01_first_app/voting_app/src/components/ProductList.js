import React from 'react';
import Product from './Product';
import Seed from '../DB/seed/seed';

class ProductList extends React.Component{
    state={
        products:[]
    };
    /*
    constructor(props){
        super(props);
        
        this.state={
            products:[]
        };

        this.handleProductUpVote = this.handleProductUpVote.bind(this);
    }
    */
    componentDidMount(){
        this.setState({products:Seed.products});
    }
    handleProductUpVote=(productId)=>{
        //console.log(productId + ' was upvoted.')
        const nextProducts = this.state.products.map((product)=>{
            if(product.id===productId){
                return Object.assign({}, product, {
                    votes:product.votes+1
                });
            }else{
                return product;
            }
        });
        this.setState({products:nextProducts});
    }
    render(){
        //const product = Seed.products[0];
        const products = this.state.products.sort((a,b)=>(b.votes-a.votes));
        const productComponents = products.map((product)=>(
            <Product
                key={'product-'+product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                iurld={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                onVote = {this.handleProductUpVote}
            />
        ));
        return (
            /* 1.8 */
            <div className='ui unstackable items'>
                {productComponents}
            </div>
            /*
            <div className='ui unstackable items'>
                <Product
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    iurld={product.url}
                    votes={product.votes}
                    submitterAvatarUrl={product.submitterAvatarUrl}
                    productImageUrl={product.productImageUrl}
                />
            </div>
            */

            /* 1.7 */
            /*
            <div className='ui unstackable items'>
                <Product/>
            </div>
            */

            /* 1.6 */
            /*
            <div className='ui unstackable items'>
                Hello, friend! I am a basic React component.
            </div>
            */
        );
    }
}

export default ProductList;