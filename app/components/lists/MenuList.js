define(function() {
    'use strict';

    var React = require('react');
    var MenuItemDefinition = require('./../../utils/definitions/MenuItemDefinitions');
    var _ = require('lodash');

    var foodCategories = MenuItemDefinition.menuItems.foodCategories;
    var foodItems = MenuItemDefinition.menuItems.food;
    var drinkCategories = MenuItemDefinition.menuItems.drinksCategories;
    var drinkItems = MenuItemDefinition.menuItems.drinks;

    var MenuList = React.createClass({
        propTypes: {
            selectedButton: React.PropTypes.string.isRequired
        },

        getInitialState: function() {
            return {
                selectedDrinkCategory: 'non-alc',
                selectedFoodCategory: 'apps',
                selectedMenuItems: []
            };
        },

        getCategoryTabs: function() {
            var markup = [],
                classname,
                self = this;
            if(this.props.selectedButton === 'drinks') {
                _.map(drinkCategories, function(category) {
                    classname = "drink tab " + category;
                    if(self.state.selectedDrinkCategory === category) {
                        classname += " selected";
                    }
                    markup.push(
                        <div key={category}
                             className={classname}
                             onClick={self.selectDrinkCategoryTab.bind(self, category)}>
                             {category.toUpperCase()}
                        </div>
                    );
                });
            }
            else if(this.props.selectedButton === 'food') {
                _.map(foodCategories, function(category) {
                    classname = "food tab " + category;
                    if(self.state.selectedFoodCategory === category) {
                        classname += " selected";
                    }
                    markup.push(
                        <div key={category}
                             className={classname}
                             onClick={self.selectFoodCategoryTab.bind(self, category)}>
                             {category.toUpperCase()}
                        </div>
                    );
                });
            }
            return markup;
        },

        selectDrinkCategoryTab: function(drinkCategory) {
            this.setState({
                selectedDrinkCategory: drinkCategory
            });
        },

        selectFoodCategoryTab: function(foodCategory) {
            this.setState({
                selectedFoodCategory: foodCategory
            });
        },

        getMenuItems: function() {
            var markup = [],
                self = this,
                classname;
            if(this.props.selectedButton === 'drinks') {
                _.map(drinkItems, function(drink) {
                    if(drink.category === self.state.selectedDrinkCategory) {
                        classname = "menu-item drink " + drink.name;
                        if(_.findIndex(self.state.selectedMenuItems, drink) > -1) {
                            classname += " selected";
                        }
                        markup.push(
                            <div key={drink.itemID}
                                 className={classname} 
                                 onClick={self.selectMenuItem.bind(null, drink)} >
                                 <span>{drink.name.toUpperCase()}</span>
                            </div>
                        )
                    }
                });
            }
            else if(this.props.selectedButton === 'food') {
                _.map(foodItems, function(food) {
                    if(food.category === self.state.selectedFoodCategory) {
                        classname = "menu-item food " + food.name;
                        if(_.findIndex(self.state.selectedMenuItems, food) > -1) {
                            classname += " selected";
                        }
                        markup.push(
                            <div key={food.itemID}
                                 className={classname} 
                                 onClick={self.selectMenuItem.bind(null, food)}>
                                 <span>{food.name.toUpperCase()}</span>
                            </div>
                        )
                    }
                });
            }
            return markup;
        },
        
        selectMenuItem: function(menuItem) {
            var index = _.findIndex(this.state.selectedMenuItems, menuItem);
            if(index > -1) {
                _.pullAt(this.state.selectedMenuItems, index);
                this.setState({
                    selectedMenuItems: this.state.selectedMenuItems
                });
            }
            else {
                this.state.selectedMenuItems.push(menuItem);
                this.setState({
                    selectedMenuItems: this.state.selectedMenuItems
                });
            }
        },

        render: function() {
            return (
                <div className="menu-list">
                    <div className="category-tabs">
                        {this.getCategoryTabs()}
                    </div>
                    <div className="menu-items">
                        {this.getMenuItems()}
                    </div>
                    <button className="deselect-all">DESELECT ALL</button>
                    <button className="add-to-check">ADD TO CHECK</button>
                </div>
            );
        }
    });

    return MenuList;
});