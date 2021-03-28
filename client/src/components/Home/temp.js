'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var SampleApp = React.createClass({

  getInitialState: function() {
        return {
       te: [<Text>Yo</Text>],
         index:1
    }
  },

  insertText: function() {
    this.state.te.push(
        <Text>Text number {this.state.index}</Text>
    )
    this.setState({
        index: this.state.index + 1,
      te: this.state.te
    })
  },

  render: function() {

    var MyText = function(t) {
      return(
        <Text>
          {t}
        </Text>
      )           
    }

    return (
      <View style={styles.container}>
            {MyText(this.state.te)}
        <TouchableHighlight onPress={ () => this.insertText() } style={{ marginTop:20, height:60, flexDirection: 'row', backgroundColor: '#ededed', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>Add Text</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  }
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);