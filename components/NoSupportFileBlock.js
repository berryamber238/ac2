import React from 'react';
import { ExpoImage, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const NoSupportFileBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const onCommentDelete = async id => {
    setConfirm_modal_visiable(true);

    setModal_title(t(Variables, 'common_tips'));
    setModal_message(t(Variables, 'are_you_sure_delete'));
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestCommentsDeleteDELETE.mutateAsync({
            id: id,
          })
        )?.json;
        /* 'If/Else' action requires configuration: select If Condition */
        console.log(res);
        if (res.code === 200) {
          await refetchMyTopicComments();
        }
        setConfirm_modal_visiable(false);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const onConfirm = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.
    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  };

  const onDelete = async id => {
    setConfirm_modal_visiable(true);

    setModal_title(t(Variables, 'common_tips'));
    setModal_message(t(Variables, 'are_you_sure_delete'));
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestTopicDeleteDELETE.mutateAsync({
            id: id,
          })
        )?.json;
        /* 'If/Else' action requires configuration: select If Condition */
        console.log(res);
        if (res.code === 200) {
          setRefresh(!refresh);
        }
        setConfirm_modal_visiable(false);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const onRecall = async id => {
    setConfirm_modal_visiable(true);

    setModal_title(t(Variables, 'common_tips'));
    setModal_message(t(Variables, 'are_you_sure_recall_topic'));
    setModal_callback(() => async () => {
      try {
        const res = (
          await aceCampTestTopicToDraftPUT.mutateAsync({
            id: id,
          })
        )?.json;
        /* 'If/Else' action requires configuration: select If Condition */
        console.log(res);
        if (res.code === 200) {
          setRefresh(!refresh);
        }
        setConfirm_modal_visiable(false);
      } catch (err) {
        console.error(err);
      }
    });
  };
  let confirmFunc;

  return (
    <View
      style={StyleSheet.applyWidth(
        { alignItems: 'center', justifyContent: 'center', marginTop: 20 },
        dimensions.width
      )}
    >
      {/* SVG */}
      <ExpoImage
        allowDownscaling={true}
        cachePolicy={'disk'}
        contentPosition={'center'}
        resizeMode={'cover'}
        transitionDuration={300}
        transitionEffect={'cross-dissolve'}
        transitionTiming={'ease-in-out'}
        {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
        source={imageSource(Constants['empty_svg'])}
        style={StyleSheet.applyWidth(
          GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
          dimensions.width
        )}
      />
      <Text
        accessible={true}
        selectable={false}
        style={StyleSheet.applyWidth(
          {
            color: palettes.Brand.itemTextNomal,
            fontFamily: 'System',
            fontSize: 12,
            fontWeight: '400',
            letterSpacing: 0.2,
            lineHeight: 20,
            marginRight: null,
            marginTop: 10,
          },
          dimensions.width
        )}
      >
        {'不支持的文件类型'}
      </Text>
    </View>
  );
};

export default withTheme(NoSupportFileBlock);
