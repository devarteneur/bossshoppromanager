import React, { Component } from 'react';
import { Container, Header, Checkbox, Content, Footer, Sidebar, Input, InputGroup, AutoComplete, Row, Col, InputNumber, Button   } from 'rsuite';
import itemData from '../../mcdata/items'
import yaml from 'yaml';

const sampleShop = {
    ShopName: "TestShop",
    DisplayName: 'Test Shop',
    Command: "testingshop",
    signs: {
        text:"[TestingShop]",
        NeedPermissionToCreateSign:true
    },
    shop:{} 
}

let items = [];

class ShopCreator extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            buyOption:true,
            sellOption:true,
            buyBulkOption:true,
            sellBulkOption: true,
            sellAllOption:true,
            itemList:[]
        }
    }
    
    capitalize(input) {  
        var CapitalizeWords = input[0].toUpperCase();  
        for (var i = 1; i <= input.length - 1; i++) {  
            let currentCharacter,  
                previousCharacter = input[i - 1];  
            if (previousCharacter && previousCharacter == ' ') {  
                currentCharacter = input[i].toUpperCase();  
            } else {  
                currentCharacter = input[i];  
            }  
            CapitalizeWords = CapitalizeWords + currentCharacter;  
        }  
        return CapitalizeWords;  
    }  

    generateItem(itemName, buyPrice, sellPrice, invLoc, options){
        options = options || {buy:false, sell:true, bulkBuy:false, bulkSell:false, massSell:true}
        let typeString = `type:${itemName}`; //Dynamic
        let niceName = this.capitalize(itemName.replace(/_/g, ' '))
        let displayString = `name:&9${niceName}` //Dynamic
        let Price = buyPrice;
        let PriceType_right = sellPrice;
        console.log(options)
        let thisItem = {
            MenuItem: [
              //'type:DIAMOND',
              'amount:1',
              //'name:&9Diamond',
            ],
            ExtraPermission: '',
            //InventoryLocation: 0
          }

        thisItem.MenuItem.push(typeString)
        thisItem.MenuItem.push(displayString)

        if(options.buy){
            thisItem.MenuItem.push('lore1:&2aristero klik &egia na agoraseis &b%reward% &egia &c%price%&e.')
            thisItem.Price = Price;
            thisItem.RewardType = 'ITEM';
            thisItem.Reward = ['amount:1'];
            thisItem.Reward.push(typeString)
            thisItem.PriceType = 'Money';
            thisItem.Message =  '&eMolis agorases %reward%! Sou emeinan: &c%left%';
        }
        
        if(options.sell){
            thisItem.MenuItem.push('lore2:&2dexi klik &egia na pouliseis &c%price_right% &egia &b%reward_right%&e.')
            thisItem.Reward_right = PriceType_right;
            thisItem.RewardType_right = 'MONEY';
            thisItem.PriceType_right = 'ITEM';
            thisItem.Price_right = [ 'amount:1' ];
            thisItem.Price_right.push(typeString)
            thisItem.Message_right = '&eMolis poulises %price_right%!';
        }

        if(options.bulkBuy){   
            thisItem.MenuItem.push('lore3:&2shift kai aristero klik &egia na agoraseis &b%reward_shift_left% &egia &c%price_shift_left%&e.')
            let Price_shift_left = buyPrice * 16;
            thisItem.Price_shift_left = Price_shift_left;
            thisItem.RewardType_shift_left = 'ITEM';
            thisItem.Reward_shift_left = ['amount:16'];
            thisItem.Reward_shift_left.push(typeString)
            thisItem.PriceType_shift_left = 'MONEY';
            thisItem.Message_shift_left = '&eMolis agorases %reward_shift_left%! Sou emeinan: &c%left%';
        }

        if(options.bulkSell){
            thisItem.MenuItem.push('lore4:&2shift kai dexi klik &egia na pouliseis &c%price_shift_right% &egia &b%reward_shift_right%&e.')
            let Reward_shift_right = sellPrice * 16;
            thisItem.Reward_shift_right = Reward_shift_right;
            thisItem.RewardType_shift_right = 'MONEY';
            thisItem.PriceType_shift_right = 'ITEM';
            thisItem.Price_shift_right = ['amount:16'];
            thisItem.Price_shift_right.push(typeString)
            thisItem.Message_shift_right = '&eMolis poulises %price_shift_right%!';
        }

        if(options.massSell){
            thisItem.MenuItem.push('lore5:&2middle klik &egia na pouliseis olo to inventory sou apo to item')
            let Reward_middle = sellPrice * (1 - 0.10); //10% lower sale price for bulk sales
            thisItem.Reward_middle = Reward_middle;
            thisItem.RewardType_middle = 'MONEY';
            thisItem.PriceType_middle = 'ITEMALL';
            thisItem.Price_middle = [];
            thisItem.Price_middle.push(typeString)
            thisItem.Message_middle = '&eMolis poulises olo to inv gia %price_middle%!';
        }


        thisItem.InventoryLocation = invLoc;

        return thisItem;
    }

    returnItemList(){
        let curated = []
        for(let item in itemData){
            //console.log(itemData[item].name)
            curated.push(itemData[item].name)
        }
        return curated;
    }

    handleData(){
        let iname = this.state.itemName;
        let bprice = this.state.buyPrice;
        let sprice = this.state.sellPrice;
        let options = {buy:this.state.buyOption, sell:this.state.sellOption, bulkBuy:this.state.buyBulkOption, bulkSell:this.state.sellBulkOption, massSell:this.state.sellAllOption};

        console.log('adding to table')
        let newItemList = this.state.itemList.concat({
            iname,
            bprice,
            sprice,
            options
        })
        this.setState({itemList:newItemList})
        console.log(`${this.state.itemName} ${this.state.buyPrice} ${this.state.sellPrice} ${options} `)
    }

    renderItemColumns(){
        let content = [];

        return this.state.itemList.map((item, index)=>{
           return(
            <Row key={item.iname} className="show-grid">
                <Col xs={2}>{item.iname}</Col>
                <Col xs={1}>{item.bprice}</Col>
                <Col xs={1}>{item.sprice}</Col>
                <Col xs={8}>{JSON.stringify(item.options)}</Col>
                <Col xs={4}><Button onClick={()=>{this.deleteItemFromShop(item.iname, index)}}>X</Button></Col>
            </Row>
           )
        })   
    }

    deleteItemFromShop(itemName, index){
        console.log(`Deleting...${itemName}`)

        let iname = this.state.itemName
        let newItemList =  this.state.itemList
        newItemList.splice(index , 1)
        this.setState({itemList:newItemList})
        console.log(this.state.itemList)

    }

    generateShop(){
        let i = 0;
        let newShop = {}
        newShop = sampleShop;
        newShop.ShopName = this.state.shopName;
        newShop.DisplayName = this.state.displayName;
        newShop.Command = this.state.command;
        newShop.signs.text = this.state.signText;
        newShop.shop = {}
        console.log('Items to Generate...')
        console.log(this.state.itemList)
        for(let item in this.state.itemList){
            
            newShop.shop[this.state.itemList[item].iname] = this.generateItem(this.state.itemList[item].iname, this.state.itemList[item].bprice, this.state.itemList[item].sprice, i+1, this.state.itemList[item].options)
            i++;
            console.log(i)
            console.log(this.state.itemList.length)
            if(i >= this.state.itemList.length){
                navigator.clipboard.writeText(yaml.stringify(newShop))
                console.log(newShop)
            }
        }        
    }

    render(){
        console.log(this.state)
        //console.log(yaml.stringify(sampleShop))
        //console.log(yaml.stringify(this.generateItem('DIAMOND', 400, 112, 0)))
        //navigator.clipboard.writeText(yaml.stringify(this.generateItem('DIAMOND', 400, 112, 0)))
        //console.log(this.returnItemList())
        
        return(
            <Container style={{marginTop:'3vw', marginLeft: '5vw', marginRight: '5vw'}}>
                <Header>
                    <h1>Shop Creator</h1>
                    <h2>Use this tool to create separate shops for your server</h2>
                </Header>
                <hr />
                <Content >
                <Row className="show-grid">
                    <Col xs={6}><Input placeholder="Shop Name" onChange={(e)=>{this.setState({shopName:e})}} value={this.state.shopName} /></Col>
                    <Col xs={6}><Input placeholder="Display Name"  onChange={(e)=>{this.setState({displayName:e})}}  /></Col>
                    <Col xs={6}><Input placeholder="Command"  onChange={(e)=>{this.setState({command:e})}}  /></Col>
                    <Col xs={6}><Input placeholder="Sign Text" onChange={(e)=>{this.setState({signText:`[${e}]`})}}  /></Col>
                </Row>
                <hr />
                <Row className="show-grid">
                    <Col xs={8}><AutoComplete onChange={(e)=>{this.setState({itemName:e})}} placeholder="Item Name" data={this.returnItemList()} /></Col>
                    <Col xs={8}><InputNumber onChange={(e)=>{this.setState({buyPrice:e})}} step={10} placeholder="Buy Price"/></Col>
                    <Col xs={8}>
                        <InputNumber step={10} onChange={(e)=>{this.setState({sellPrice:e})}} placeholder="Sell Price"/>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={4}><Checkbox onChange={()=>{this.setState({buyOption:!this.state.buyOption})}} defaultChecked> Buy</Checkbox></Col>
                    <Col xs={4}><Checkbox onChange={()=>{this.setState({sellOption:!this.state.sellOption})}} defaultChecked> Sell</Checkbox></Col>
                    <Col xs={4}><Checkbox onChange={()=>{this.setState({buyBulkOption:!this.state.buyBulkOption})}} defaultChecked> 16 Buy</Checkbox></Col>
                    <Col xs={4}><Checkbox onChange={()=>{this.setState({sellBulkOption:!this.state.sellBulkOption})}} defaultChecked> 16 Sell</Checkbox></Col>
                    <Col xs={4}><Checkbox onChange={()=>{this.setState({sellAllOption:!this.state.sellAllOption})}} defaultChecked> Sell All</Checkbox></Col>
                </Row>
                <br />
                <Row className="show-grid">
                    <Col xs={8}><Button onClick={()=>{this.handleData()}}  >Add</Button></Col>
                    <Col xs={8}></Col>
                    <Col xs={8}></Col>
                </Row>
                
                <hr />   
                
                {this.renderItemColumns()}
              
                
                <Button onClick={()=>{this.generateShop()}}>Generate Shop</Button>
                </Content>

            </Container>
        )
    }
}

export default ShopCreator;