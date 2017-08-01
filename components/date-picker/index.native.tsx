import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import PickerStyle, { IPickerStyle } from '../picker/style/index.native';
import { formatFn, getDefaultDate } from './utils';
import tsPropsType from './PropsType';
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import { getComponentLocale } from '../_util/getLocale';

export interface IDatePickerNativeProps extends tsPropsType {
  styles?: IPickerStyle;
}

const PickerStyles = StyleSheet.create<any>(PickerStyle);

export default class DatePicker extends React.Component<IDatePickerNativeProps, any> {
  static defaultProps = {
    mode: 'datetime',
    extra: '请选择',
    triggerType: 'onClick',
    styles: PickerStyles,
    minuteStep: 1,
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  render() {
    const { props, context } = this;
    const { children, extra, value, styles } = props;
    const locale = getComponentLocale(props, context, 'DatePicker', () => require('./locale/zh_CN'));
    const { okText, dismissText, DatePickerLocale } = locale;

    const dataPicker = (
      <RCDatePicker
        minuteStep={props.minuteStep}
        locale={DatePickerLocale}
        mode={props.mode}
        minDate={props.minDate}
        maxDate={props.maxDate}
        defaultDate={value || getDefaultDate(this.props)}
      />
    );
    const newProps = {
      ...props,
      okText,
      dismissText,
    };
    return (
      <PopupDatePicker
        datePicker={dataPicker}
        styles={styles}
        {...newProps}
        date={value || getDefaultDate(this.props)}
      >
        {children && React.cloneElement(children, { extra: value ? formatFn(this, value) : extra })}
      </PopupDatePicker>
    );
  }
}
