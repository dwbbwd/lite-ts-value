import { IEnumFactory } from './i-enum-factory';
import { ValueHandlerOption } from './value-handler-option';
import { ValueHandlerBase } from './value-handler-base';
import { ValueTypeData } from './value-type-data';

export class UpdateSyncHandler extends ValueHandlerBase {
    public constructor(
        private m_EnumFactory: IEnumFactory,
    ) {
        super();
    }

    public async handle(option: ValueHandlerOption) {
        const allItem = await this.m_EnumFactory.build<ValueTypeData>('ValueTypeData').allItem;
        const sync = allItem[option.value.valueType]?.sync;
        if (sync?.valueTypes?.length) {
            await option.valueService.update(
                option.uow,
                sync.valueTypes.filter(r => r != option.value.valueType).map(r => {
                    return {
                        ...option.value,
                        valueType: r
                    };
                })
            );
        }

        await this.next?.handle?.(option);
    }
}