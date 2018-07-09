import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderDescription = () => {
    const {
      expanded,
      library: {
        item
      }
    } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>{item.description}</Text>
        </CardSection>
      );
    }
  }
  render() {
    const { id, title } = this.props.library.item;
    const { titleStyle } = styles;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View style={{ overflow: 'hidden' }}>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = ({ selectedLibraryId }, ownProps) => {
  const expanded = selectedLibraryId === ownProps.library.item.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
