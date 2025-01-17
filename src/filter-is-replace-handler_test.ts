import { Mock } from 'lite-ts-mock';

import { FilterIsReplaceHandler as Self } from './filter-is-replace-handler';
import { IEnum, IEnumFactory } from './i-enum-factory';
import { ValueHandlerBase } from './value-handler-base';
import { ValueService } from './value-service';
import { ValueTypeData } from './value-type-data';

describe('src/filter-is-replace-handler.ts', () => {
    describe('.handle(option: ValueHandlerOption)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<IEnumFactory>();
            const self = new Self(
                mockEnumFactory.actual,
            );

            const mockEnum = new Mock<IEnum<ValueTypeData>>({
                allItem: {}
            });
            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnum.actual
            );

            const mockValueService = new Mock<ValueService>();
            mockValueService.expectReturn(
                r => r.getCount(null, 2),
                11
            );

            const mockHandler = new Mock<ValueHandlerBase>();
            self.setNext(mockHandler.actual);

            mockHandler.expected.handle(
                {
                    value: {
                        count: 1,
                        valueType: 2
                    },
                    valueService: mockValueService.actual
                }
            );

            await self.handle(
                {
                    value: {
                        count: 1,
                        valueType: 2
                    },
                    valueService: mockValueService.actual
                }
            );
        });

        it('isReplace && count == oldCount', async () => {
            const mockEnumFactory = new Mock<IEnumFactory>();
            const self = new Self(
                mockEnumFactory.actual,
            );

            const mockValueService = new Mock<ValueService>();
            mockValueService.expectReturn(
                r => r.getCount(null, 2),
                1
            );

            const mockEnum = new Mock<IEnum<ValueTypeData>>({
                allItem: {
                    2: {
                        isReplace: true
                    } as ValueTypeData
                }
            });
            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnum.actual
            );

            const mockHandler = new Mock<ValueHandlerBase>();
            self.setNext(mockHandler.actual);

            await self.handle(
                {
                    uow: null,
                    value: {
                        count: 1,
                        valueType: 2
                    },
                    valueService: mockValueService.actual
                }
            );
        });

        it('count == 0', async () => {
            const mockEnumFactory = new Mock<IEnumFactory>();
            const self = new Self(
                mockEnumFactory.actual,
            );

            const mockValueService = new Mock<ValueService>();
            mockValueService.expectReturn(
                r => r.getCount(null, 2),
                11
            );

            const mockEnum = new Mock<IEnum<ValueTypeData>>({
                allItem: {}
            });
            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnum.actual
            );

            const mockHandler = new Mock<ValueHandlerBase>();
            self.setNext(mockHandler.actual);

            await self.handle(
                {
                    uow: null,
                    value: {
                        count: 0,
                        valueType: 2
                    },
                    valueService: mockValueService.actual
                }
            );
        });
    });
});