import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, View, Image } from 'react-native';
import { ListItem, Text, Left, Body, Right } from 'native-base';
import Strings from '../utils/Strings';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

var styles = require('../../assets/files/Styles');

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  search = (string) => {
    this.props.navigation.navigate('SearchScreen', { string: '' });
  }

  render() {
    return (
      <View style={styles.container_menu}>
        <View style={styles.sideMenu}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ flex: 1, width: 220, height: 220 }}
            resizeMode='contain' />
        </View>

        <ScrollView>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('Tab')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <Icon name="tag" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST2.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <Icon name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('AboutMe')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <Icon name="user" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST3.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <Icon name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem style={styles.item_menu} onPress={this.search.bind(this)} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <Icon name="magnifier" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST4.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <Icon name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('MySharing')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <Icon name="heart" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST6.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <Icon name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('MyShare')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <Icon name="settings" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST7.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <Icon name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

          <ListItem style={styles.item_menu} onPress={this.navigateToScreen('Happy')} icon>
            <Left style={{ borderBottomWidth: 0 }}>
              <Icon name="login" style={styles.iconSidemenu} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={styles.text_menu}>{Strings.ST8.toUpperCase()}</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <Icon name="arrow-right" style={styles.icon_menu} />
            </Right>
          </ListItem>

        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
