import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { Colors } from "../components/utils/colors.utils";
import Overlay from "react-native-modal-overlay";

class OverlayWidget extends Component {
  static propTypes = {
    id: PropTypes.string
  };

  render() {
    const { showOverlay, closePopup, children, duration } = this.props;
    return (
      <Overlay
        visible={showOverlay}
        closeOnTouchOutside={true}
        animationType="zoomIn"
        containerStyle={{ backgroundColor: "rgba(67, 74, 76, 0.83)" }}
        childrenWrapperStyle={{
          backgroundColor: Colors.AnalogicThemeLightGrey,
          padding: 0,
          maxHeight: "50%"
        }}
        animationDuration={duration ? duration : 100}
        onClose={closePopup}
      >
        <ScrollView
          style={{
            width: "100%",
            backgroundColor: Colors.AnalogicThemeLightGrey
          }}
        >
          {children}
        </ScrollView>
      </Overlay>
    );
  }
}

export default OverlayWidget;
