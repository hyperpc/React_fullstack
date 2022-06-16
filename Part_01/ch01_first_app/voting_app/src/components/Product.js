import React from 'react';

class Product extends React.Component{
    constructor(props){
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
    }
    handleUpVote(){
        this.props.onVote(this.props.id);
    }
    render(){
        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl} alt='product'/>
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <button type='button' className='link-button' 
                            onClick={this.handleUpVote}>
                            <i className='large caret up icon'/>
                        </button>
                        {this.props.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>{this.props.title}</a>
                        <p>{this.props.description}</p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by:</span>
                        <img className='ui avatar image' src={this.props.submitterAvatarUrl} alt='avatar'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;