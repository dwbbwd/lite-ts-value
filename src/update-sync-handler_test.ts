import { Mock } from 'lite-ts-mock';

import { IEnum, IEnumFactory } from './i-enum-factory';
import { UpdateSyncHandler as Self } from './update-sync-handler';
import { ValueService } from './value-service';
import { ValueTypeData } from './value-type-data';

describe('src/update-sync-handler.ts', () => {
    describe('.handle(option: ValueHandlerOption)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<IEnumFactory>();
            const self = new Self(
                mockEnumFactory.actual,
            );

            const mockEnum = new Mock<IEnum<ValueTypeData>>({
                allItem: {
                    2: {
                        sync: {
                            valueTypes: [3, 4]
                        }
                    } as ValueTypeData
                }
            });
            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnum.actual
            );

            const mockValueService = new Mock<ValueService>();
            mockValueService.expected.update(null, [{
                count: 1,
                valueType: 3,
            }, {
                count: 1,
                valueType: 4,
            }]);

            await self.handle({
                uow: null,
                value: {
                    count: 1,
                    valueType: 2
                },
                valueService: mockValueService.actual
            });
        });
    });
});