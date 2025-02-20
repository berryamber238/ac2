import React from 'react';
import { withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  cancelBtn: null,
  confirmBtn: null,
  message: null,
  onCancel: () => {},
  onConfirm: () => {},
  title: null,
  visiable: null,
};

const ConfirmViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View>
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={props.title}
          message={props.message}
          confirmBtn={props.confirmBtn}
          cancelBtn={props.cancelBtn}
          onCancel={props.onCancel}
          onConfirm={props.onConfirm}
          visible={props.visiable}
        />
      </Utils.CustomCodeErrorBoundary>
    </View>
  );
};

export default withTheme(ConfirmViewBlock);
