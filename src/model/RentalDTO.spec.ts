import {expect} from 'chai';
import RentalFormData from './RentalFormData';
import RentalDTO, { CustomerInfo, ProductInfo, PaybackInfo, PaymentInfo } from './RentalDTO';
import { getBankNameByBankCode, getCardNameByCardCode, getGiftCardNameByCode } from '../utils/FinancialUtil';

const LGSampleData: RentalFormData = {
    c_name: '테스트',
    c_tel2_type: 'LG',
    c_tel21: '010',
    c_tel22: '9312',
    c_tel23: '5123',
    c_tel31: '010',
    c_tel32: '9312',
    c_tel33: '5123',
    g_auth: 'false',
    c_zipcode1: '463',
    c_zipcode2: '894',
    c_address: '경기 수원시 영통구 덕영대로 1503 (영통동)',
    c_address2: '411동 104호',
    c_jumin1: '190128',
    c_gender: '남',
    g_payment_method: '계좌이체',
    g_bank_cd: '4',
    g_bank_no: '620-209007-853',
    g_bank_holder: '테스트',
    g_card_cd: '14',
    g_card_no: '123123',
    g_card_gigan: '11',
    g_card_gigan1: '2',
    g_card_holder: '김진구',
    g_sp_giftcard_code: '1',
    content_copy: 'Y',
    g_sp_bank_code: '4',
    g_sp_bank_acount: '620-209007-853',
    g_sp_bank_holder: '테스트',
    p_vendor: [ 'LG', '' ],
    p_product: [ '정수기', '공기청정기', '' ],
    p_product_name: '(정수기)WD502AS, (건조기)RH16WC',
    p_product_color: '(정수기)그레이',
    p_promise: '3년약정',
    g_bigo: '',
    w_agree: 'false' 
}
describe('RentalDTO', () => {
    let registerDTO: RentalDTO;

    before(() => {
        registerDTO = new RentalDTO(LGSampleData);
    })

    it('getter CustomerInfo', () => {
        const customerInfo: CustomerInfo = registerDTO.CustomerInfo;

        expect(customerInfo.name).to.equal(LGSampleData.c_name);
        expect(customerInfo.mobileCarrier).to.equal(LGSampleData.c_tel2_type);
        expect(customerInfo.mobileNumber).to.equal(`${LGSampleData.c_tel21}-${LGSampleData.c_tel22}-${LGSampleData.c_tel23}`);
        expect(customerInfo.mobileAuth).to.equal(LGSampleData.g_auth !== 'false');
        expect(customerInfo.zipCode).to.equal(`${LGSampleData.c_zipcode1}-${LGSampleData.c_zipcode2}`);
        expect(customerInfo.address).to.equal(LGSampleData.c_address);
        expect(customerInfo.address2).to.equal(LGSampleData.c_address2);
        expect(customerInfo.birthday).to.equal(`${LGSampleData.c_jumin1}`);
        expect(customerInfo.gender).to.equal(`${LGSampleData.c_gender}`);
    });

    it('getter PaymentInfo', () => {
        const paymentInfo: PaymentInfo = registerDTO.PaymentInfo;

        expect(paymentInfo.paymentMethod).to.equal(LGSampleData.g_payment_method);
        expect(paymentInfo.bankName).to.equal(getBankNameByBankCode(Number(LGSampleData.g_bank_cd)));
        expect(paymentInfo.accountNumber).to.equal(LGSampleData.g_bank_no);
        expect(paymentInfo.accountHoler).to.equal(LGSampleData.g_bank_holder);
        expect(paymentInfo.cardName).to.equal(getCardNameByCardCode(Number(LGSampleData.g_card_cd)),);
        expect(paymentInfo.cardNumber).to.equal(LGSampleData.g_card_no);
        expect(paymentInfo.cardExpirationDate).to.equal(`${LGSampleData.g_card_gigan}년${LGSampleData.g_card_gigan1}월`);
        expect(paymentInfo.cardHolder).to.equal(LGSampleData.g_card_holder);
    });

    it('getter ProductInfo', () => {
        const productInfo: ProductInfo = registerDTO.ProductInfo;

        expect(productInfo.vendor).to.deep.equal(LGSampleData.p_vendor);
        expect(productInfo.types).to.deep.equal(LGSampleData.p_product);
        expect(productInfo.names).to.deep.equal(LGSampleData.p_product_name);
        expect(productInfo.colors).to.deep.equal(LGSampleData.p_product_color);
        expect(productInfo.countractDue).to.equal(LGSampleData.p_promise);
    });

    it('getter PaybackInfo', () => {
        const paybackInfo: PaybackInfo = registerDTO.PaybackInfo;

        expect(paybackInfo.bankName).to.equal(getBankNameByBankCode(Number(LGSampleData.g_sp_bank_code)));
        expect(paybackInfo.accountNumber).to.equal(LGSampleData.g_sp_bank_acount);
        expect(paybackInfo.accountHolder).to.equal(LGSampleData.g_sp_bank_holder);
        expect(paybackInfo.giftCardName).to.equal(getGiftCardNameByCode(Number(LGSampleData.g_sp_giftcard_code)));
    });
})