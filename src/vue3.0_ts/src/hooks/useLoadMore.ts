import { IGlobalState } from '@/store';
import { Ref } from 'vue';
import { Store } from 'vuex';

/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-25 18:02:28
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-25 18:05:49
 */
export function useLoadMore(
    refreshElm: Ref<null | HTMLElement>,
    store: Store<IGlobalState>,
    type: string
) {}
