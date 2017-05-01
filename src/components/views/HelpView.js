import React from 'react';
import {
  View,
  Text,
  ListView
} from 'react-native';

import { connect } from 'react-redux';

import Container from '../misc/Container';

var sections = [
  {
    header: "Snarveier",
    text: "Visste du at du kan bruke mange av de samme nettadressene i denne appen som i NVDB-APIet?" +
      "\n\nStøttede snarveier:\nnatt=[true/false] (Slår på/av nattmodus)",
  }
]

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class HelpView extends React.Component {
  render() {
    return (
      <Container>
        <ListView
          dataSource={ds.cloneWithRows(sections)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        />
      </Container>
    );
  }

  renderRow(row) {
    const {theme} = this.props;
    return (
      <View style={{ padding: 10 }}>
        <Text style={theme.subtitle}>{row.header}</Text>
        <Text style={theme.text}>{row.text}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
  }
}

export default connect(mapStateToProps, null) (HelpView);
