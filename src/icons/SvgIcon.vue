<template>
    <div>ss
        <svg :class="svgClass" aria-hidden="true">
            <use :xlink:href="iconName"/>
        </svg>
    </div>
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

            console.log(props.className);

            const msg = ref('asdsad');

            const iconName = computed(() => `#icon-${props.iconClass}`);
            const svgClass=computed(()=>{
                if(props.className){
                    return `svg-icon ${props.className}`
                }
            })

            return {
                msg,
                iconName,
                svgClass
            }

        }
    }
</script>

<style lang="scss" scoped>


</style>
