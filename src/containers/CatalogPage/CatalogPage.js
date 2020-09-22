import React, { Component } from 'react'
import styles from './CatalogPage.module.css'
import Product from '../../components/Product/Product';
import Navbar from '../../components/Navbar/Navbar';
import Summary from '../../components/Summary/Summary';
import Data from '../../aux/Data';
const log = console.log;
const priceMap = {};
let status = false;
const LIST  = Data.data.responseData.productList;
export class CatalogPage extends Component {

    constructor(props){
        super(props);
        
        this.state = {
                        list:LIST,
                        catalogState:{
                        },
                        price:0,
                        items:0
                    }
                    Data.data.responseData.productList.forEach(function(product){
                        priceMap[product.skuCode]=product.sellingPrice;
                    });
                    this.handleChange = this.handleChange.bind(this);

                }
                getPreviousState(){
                    return JSON.parse(localStorage.getItem('state'));
                }
    componentWillMount(){
        status = localStorage.getItem('status');
    }
    componentDidMount(){
        if(status){
            log("Prev state found in will update")
            console.log(this.getPreviousState());
            let prevState = this.getPreviousState()
            prevState.list=LIST;
            this.setState(prevState);
            
        }
    }

    updateProductHandler(id, addOrRem){
        let updatedState = {...this.state}
        let newPrice;
        // Empty State condition
        if(!updatedState.catalogState[id]){
            updatedState.catalogState[id]=0;
        }
        if(addOrRem){
            updatedState.catalogState[id]+=1;
            updatedState.items+=1;
            newPrice = updatedState.price+priceMap[id];
        } else {
            updatedState.catalogState[id]-=1;
            updatedState.items-=1;
            newPrice = updatedState.price-priceMap[id];
        }
        updatedState.price=newPrice;
        this.commitState(updatedState);
    }
    commitState(updatedState){
        this.setState(updatedState, () => this.commitLocalStorage());
    }
    commitLocalStorage(){
        localStorage['state']=JSON.stringify(this.state);
        localStorage['status']=JSON.stringify(true);       
    }
    getCount(id){
        if(this.state.catalogState[id]){
            return this.state.catalogState[id]
        } return 0;
    }
    renderProductList(){
        let list = this.state.list;
        log("State", this.state.catalogState);
        return list.map( (product) => {
            return <Product image={product.productImages[0].name} 
                            name={product.productName}
                            price={product.sellingPrice}
                            key={product.skuCode}
                            uid={product.skuCode}
                            addClicked = {()=>this.updateProductHandler(product.skuCode, true)}
                            removeClicked = {()=> this.updateProductHandler(product.skuCode, false)}
                            count={this.getCount(product.skuCode)}
                            />
        });
    }
    handleChange(event){
        let value = event.target.value;
        value = value.toLowerCase();
        let updatedState = this.state;
        let list = updatedState.list;
        value = value.trim();
        if(!value){
            log(updatedState.list);
            updatedState.list=LIST
        } else {
            log("search: ",value);
            let res = list.filter( name => name.productName.toLowerCase().includes(value));
            updatedState.list=res;
        }
        this.setState(updatedState);
    }
    deleteAll(){
        log("Delete Called");
        localStorage.clear();
        this.setState(
            {
                data:Data.data.responseData.productList,
                catalogState:{
                },
                price:0,
                items:0
            }
        );
    }
    render() {
        return (
            <div>
                <Navbar search={(event)=>this.handleChange(event)}></Navbar>
                <div className={styles.catalog}>
                    {this.renderProductList()}
                </div>
                <Summary items={this.state.items} amount={this.state.price} delete={() => this.deleteAll()}></Summary>
            </div>
        )
    }
}

export default CatalogPage
