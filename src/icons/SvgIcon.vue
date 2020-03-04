<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
    import {reactive, ref, computed} from '@vue/composition-api';

    export default {
        name: 'SvgIcon',
        // props:['iconClass','className'],
        props: {
            iconClass: {
                type: String,
                default: '',//()=>[]
                required: true,
                // validator:()=>{
                //
                // }
            },
            className: {
                type: String,
                default: ''
            }
        },
        setup(props, {refs, root},) {


            const iconName = computed(() => `#icon-${props.iconClass}`);
            const svgClass = computed(() => {
                if (props.className) {
                    return `svg-icon ${props.className}`;
                }else{
                    return 'svg-icon';
                }
            })

            return {
                iconName,
                svgClass,
            }

        }
    }
</script>

<style lang="scss" scoped>
    .svg-icon{
        width: 1em;
        height: 1em;
        /*font-size: 12px;*/
        /*color: #fff;*/
        /*fill: currentColor;*/
    }



</style>
