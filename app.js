import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ListView,
  Keyboard
} from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    };
  }

  setSource = (items, itemsDataSource, otherState) => {
    const { dataSource } = this.state;
    this.setState({
      items,
      dataSource: dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    });
  }

  handleToggleAllComplete = () => {
    const { items, allComplete } = this.state;
    const newItems = items.map(item => ({
      ...item,
      complete: !allComplete
    }));
    this.setSource(newItems, newItems, { allComplete: !allComplete });
  };

  handleAddItem = () => {
    const { value, items } = this.state;
    if (!value) {
      return;
    }
    const newItems = [
      ...items,
      {
        key: Date.now(),
        text: value,
        complete: false
      }
    ];
    this.setSource(newItems, newItems, { value: '' });
  };

  render() {
    const { value, dataSource } = this.state;
    return (
      <View style={styles.container}>
        <Header
          value={value}
          onAddItem={this.handleAddItem}
          onChange={eventValue => this.setState({ value: eventValue })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...rowValue }) => (
              <Row
                key={key}
                {...rowValue}
              />
            )}
            renderSeparator={(SectionId, rowId) => (
              <View
                key={rowId}
                style={styles.separator}
              />
            )}
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
