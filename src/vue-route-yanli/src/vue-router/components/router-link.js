import router from '../../router';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-23 11:35:54
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 14:21:21
 */
export default {
    name: 'router-link',
    props: {
        to: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'a'
        }
    },
    render(h) {
        let tag = this.tag;
        return (
            <tag
                onClick={() => {
                    this.$router.push(this.to);
                }}
            >
                {this.$slots.default}
            </tag>
        );
        //_c
        // return h(this.tag, {}, this.$slots.default + 'ok');
    }
};
