import {useAppSelector} from "../../redux/hooks/hooks";
import './keysFilter.scss'
import {SetStateAction, Dispatch} from "react";

type Props = {
    setFilterValue: (e: any) => void
    selectedKeys: number[],
    setCurrentFilterName: Dispatch<SetStateAction<string>>
};

export function KeysFilter(props: Props) {
    const keys = useAppSelector(state => state.authConfigs.configs.keys)

    function selectKeys(names: string[]) {
        const selectedKeys = keys.filter(key => names.includes(key.name)).map(el => el.id)
        return selectedKeys
    }

    function selectFilterKeys(keys: number[], name:string) {

        props.setFilterValue((prev: number[]) => {
            if (prev.length !== 0 && prev.every((el: number) => keys.includes(el))) {
                props.setCurrentFilterName('')
                return []
            } else {
                props.setCurrentFilterName(name)
                return keys
            }
        })
    }
    return <div className={'keysFilter'}>
        <div

            className={`keysFilter__category ${props.selectedKeys.length !== 0 && props.selectedKeys.every(key => selectKeys(['crypto', 'leadgen']).includes(key)) && 'keysFilter__category_active'}`}
            onClick={() => selectFilterKeys(selectKeys(['crypto', 'leadgen']),'Crypto & LeadGen')}>Crypto & LeadGen
        </div>
        <div
            className={`keysFilter__category ${props.selectedKeys.length !== 0 && props.selectedKeys.every(key => selectKeys(['casino', 'betting']).includes(key)) && 'keysFilter__category_active'}`}
            onClick={() => selectFilterKeys(selectKeys(['casino', 'betting']), 'Casino & Betting')}>Casino & Betting
        </div>
        <div
            className={`keysFilter__category ${props.selectedKeys.length !== 0 && props.selectedKeys.every(key => selectKeys(['nutrition']).includes(key)) && 'keysFilter__category_active'}`}
            onClick={() => selectFilterKeys(selectKeys(['nutrition']), 'Health & Beauty')}>Health & Beauty
        </div>
        <div
            className={`keysFilter__category ${props.selectedKeys.length !== 0 && props.selectedKeys.every(key => selectKeys(['whitehat', 'ecommerce']).includes(key)) && 'keysFilter__category_active'}`}
            onClick={() => selectFilterKeys(selectKeys(['whitehat', 'ecommerce']), 'Whitehat & Redhat')}>Whitehat & Redhat
        </div>
    </div>
};