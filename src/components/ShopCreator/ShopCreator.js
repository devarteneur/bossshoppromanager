import React, { Component } from 'react';
import { Container, Header, Content, Footer, Sidebar, Input, InputGroup, AutoComplete, Row, Col, InputNumber, Button   } from 'rsuite';
import itemData from '../../mcdata/items'
import yaml from 'yaml';

const data = [
    'HYPER Advertiser',
    'HYPER Web Analytics',
    'HYPER Video Analytics',
    'HYPER DMP',
    'HYPER Ad Serving',
    'HYPER Data Discovery'
  ];

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
            itemList:[]
        }
    }

    generateItem(itemName, buyPrice, sellPrice, invLoc){
        let thisItem = {
            MenuItem: [
              //'type:DIAMOND',
              'amount:1',
              //'name:&9Diamond',
              'lore1:&2aristero klik &egia na agoraseis &b%reward% &egia &c%price%&e.',
              'lore2:&2dexi klik &egia na pouliseis &c%price_right% &egia &b%reward_right%&e.',
              'lore3:&2shift kai aristero klik &egia na agoraseis &b%reward_shift_left% &egia &c%price_shift_left%&e.',
              'lore4:&2shift kai dexi klik &egia na pouliseis &c%price_shift_right% &egia &b%reward_shift_right%&e.',
              'lore5:&2middle klik &egia na pouliseis olo to inventory sou apo to item'
            ],
            RewardType: 'ITEM',
            Reward: [  //'type:DIAMOND',
             'amount:1'  ],
            PriceType: 'MONEY',
            //Price: 450,
            Message: '&eMolis agorases %reward%! Sou emeinan: &c%left%',
            RewardType_right: 'MONEY',
            //Reward_right: 112,
            PriceType_right: 'ITEM',
            Price_right: [ //'type:DIAMOND', 
            'amount:1' ],
            Message_right: '&eMolis poulises %price_right%!',
            RewardType_shift_left: 'ITEM',
            Reward_shift_left: [ //'type:DIAMOND', 
            'amount:16' ],
            PriceType_shift_left: 'MONEY',
            //Price_shift_left: 7200,
            Message_shift_left: '&eMolis agorases %reward_shift_left%! Sou emeinan: &c%left%',
            RewardType_shift_right: 'MONEY',
            //Reward_shift_right: 1792,
            PriceType_shift_right: 'ITEM',
            Price_shift_right: [ //'type:DIAMOND',
             'amount:16' ],
            Message_shift_right: '&eMolis poulises %price_shift_right%!',
            RewardType_middle: 'MONEY',
            //Reward_middle: 100,
            PriceType_middle: 'ITEMALL',
            Price_middle: [
                // 'type:DIAMOND' 
        ],
            Message_middle: '&eMolis poulises olo to inv gia %price_middle%!',
            ExtraPermission: '',
            //InventoryLocation: 0
          }

        let typeString = `type:${itemName}`; //Dynamic
        let displayString = `name:&9${itemName}` //Dynamic
        let Price = buyPrice;
        let PriceType_right = sellPrice;
        let Price_shift_left = buyPrice * 16;
        let Reward_shift_right = sellPrice * 16;
        let Reward_middle = sellPrice * (1 - 0.10); //10% lower sale price for bulk sales

        //Type
        thisItem.MenuItem.push(typeString)
        thisItem.MenuItem.push(displayString)
        thisItem.Reward.push(typeString)
        thisItem.Price_right.push(typeString)
        thisItem.Reward_shift_left.push(typeString)
        thisItem.Price_shift_right.push(typeString)
        thisItem.Price_middle.push(typeString)

        //Pricing
        thisItem.Price = Price;
        thisItem.Reward_right = PriceType_right;
        thisItem.Price_shift_left = Price_shift_left;
        thisItem.Reward_shift_right = Reward_shift_right;
        thisItem.Reward_middle = Reward_middle;

        //invLoc
        thisItem.InventoryLocation = invLoc;

        // sampleShop.shop[itemName] = thisItem

        // return sampleShop;
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
        let iname = this.state.itemName
        let bprice = this.state.buyPrice
        let sprice = this.state.sellPrice
        console.log('adding to table')
        let newItemList = this.state.itemList.concat({
            iname,
            bprice,
            sprice
        })
        this.setState({itemList:newItemList})
        console.log(`${this.state.itemName} ${this.state.buyPrice} ${this.state.sellPrice} `)
    }

    renderItemColumns(){
        let content = [];

        return this.state.itemList.map(item=>{
           return(
            <Row key={item.iname} className="show-grid">
                <Col xs={4}>{item.iname}</Col>
                <Col xs={4}>{item.bprice}</Col>
                <Col xs={4}>{item.sprice}</Col>
                <Col xs={4}><Button>X</Button></Col>
            </Row>
           )
        })   
    }

    

    generateShop(){
        let i = 0;
        sampleShop.ShopName = this.state.shopName
        sampleShop.DisplayName = this.state.displayName
        sampleShop.Command = this.state.command
        sampleShop.signs.text = this.state.signText

        for(let item in this.state.itemList){
            
            sampleShop.shop[this.state.itemList[item].iname] = this.generateItem(this.state.itemList[item].iname, this.state.itemList[item].bprice, this.state.itemList[item].sprice, i)
            i++;
            console.log(i)
            console.log(this.state.itemList.length)
            if(i >= this.state.itemList.length){
                navigator.clipboard.writeText(yaml.stringify(sampleShop))
                console.log(sampleShop)
            }
        }

   
        
    }

    render(){
        console.log(this.state)
        //console.log(yaml.stringify(sampleShop))
        //console.log(yaml.stringify(this.generateItem('DIAMOND', 400, 112, 0)))
        navigator.clipboard.writeText(yaml.stringify(this.generateItem('DIAMOND', 400, 112, 0)))
        //console.log(this.returnItemList())
        
        return(
            <Container>
                <Header>
                    <h1>Shop Creator</h1>
                    <h2>Use this tool to create separate shops for your server</h2>
                </Header>
                <hr />
                <Content>
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