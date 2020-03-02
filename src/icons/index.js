import SvgIcon from './SvgIcon';

//自定义全局组件
import Vue from "vue";

Vue.component('svg-icon', SvgIcon);

//解析svg
const req = require.context('./svg', false, /\.svg$/)//读取svg文件夹下面的*.svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
