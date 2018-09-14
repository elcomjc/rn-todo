import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ListView, Keyboard } from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    };
  }

  setSource = (items, itemsDataSource, otherState) => {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    })
  }

  handleToggleAllComplete = () => {
    const newItems = this.state.items.map(item => ({
      ...item,
      complete: !this.state.allComplete
    }));
    this.setSource(newItems, newItems, { allComplete: !this.state.allComplete});
  }

  handleAddItem = () => {
    if (!this.state.value) {
      return;
    }
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];
    this.setSource(newItems, newItems, { value: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({key, ...value}) => {
              return (
                <Row
                  key={key}
                  {...value}
                />
              )
            }}
            renderSeparator={(SectionId, rowId) => {
              return (
                <View
                  key={rowId}
                  style={styles.separator}
                />
              )
            }}
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  }
});
