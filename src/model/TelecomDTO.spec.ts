import {expect} from 'chai';
import TelecomFormData from './TelecomFormData';
import TelecomDTO, { CustomerInfo, ProductInfo, PaybackInfo, PaymentInfo, TelephoneContractInfo, CombinationCommodityInfo } from './TelecomDTO';
import { getBankNameByBankCode, getCardNameByCardCode, getGiftCardNameByCode } from '../../../Barracks/src/util/FinancialUtil';

const LGSampleData: TelecomFormData = {
    vendor: 'LG',
    telephone_carrier_move_chk: 'true',
    c_name: '김진구',
    c_tel2_type: 'SK',
    c_tel21: '010',
    c_tel22: '0323',
    c_tel23: '3564',
    g_auth: 'true',
    c_tel31: '010',
    c_tel32: '0323',
    c_tel33: '3564',
    c_tel11: '070',
    c_tel12: '4123',
    c_tel13: '6321',
    c_email1: 'myraous',
    c_email2: 'msn.com',
    emailCheck: 'msn.com',
    c_zipcode1: '463',
    c_zipcode2: '894',
    c_address: '경기 성남시 분당구 동판교로 336',
    c_address2: '봇들9단지 902동 309호',
    c_jumin1: '880512',
    c_jumin2: '1682317',
    g_payment_method: '카드',
    g_bank_cd: '3',
    g_bank_no: '620-209007-853',
    g_bank_holder: '김진구',
    g_card_cd: '14',
    g_card_no: '123123',
    g_card_gigan: '11',
    g_card_gigan1: '2',
    g_card_holder: '김진구',
    content_copy: 'Y',
    g_sp_bank_code: '3',
    g_sp_bank_acount: '620-2023307-853',
    g_sp_bank_holder: '김진구',
    g_sp_giftcard_code: '1',
    board_internet: '와이파이기본_광랜안심(100M)',
    board_tv: 'TV베이직 - 183채널',
    board_tv_add: '1대',
    board_tel: 'WiFi(무선)전화 - 번호이동Y',
    board_settop: 'UHD셋탑',
    board_wifi: '신청',
    g_code_promise: '3년약정',
    g_move_company: 'LG',
    g_move_tel1: '010-4073-2101',
    g_move_auth: '지로납부 뒤 네자리',
    g_move_no: '2323',
    p_combiation: '인터넷-인터넷결합',
    g_bigo: '비고란이다 ㅎㅎㅎ',
    w_agree: 'true'
}
describe('TelecomDTO', () => {
    let telecomDTO: TelecomDTO;

    before(() => {
        telecomDTO = new TelecomDTO(LGSampleData);
    })

    it('getter vendor', () => {
        expect(telecomDTO.vendor).to.equal(LGSampleData.vendor);
    })

    it('getter CustomerInfo', () => {
        const customerInfo: CustomerInfo = telecomDTO.CustomerInfo;

        expect(customerInfo.name).to.equal(LGSampleData.c_name);
        expect(customerInfo.mobileCarrier).to.equal(LGSampleData.c_tel2_type);
        expect(customerInfo.mobileNumber).to.equal(`${LGSampleData.c_tel21}-${LGSampleData.c_tel22}-${LGSampleData.c_tel23}`);
        expect(customerInfo.consultNumber).to.equal(`${LGSampleData.c_tel31}-${LGSampleData.c_tel32}-${LGSampleData.c_tel33}`);
        expect(customerInfo.mobileAuth).to.equal((LGSampleData.g_auth !== 'false'));
        expect(customerInfo.emgencyNumber).to.equal(`${LGSampleData.c_tel11}-${LGSampleData.c_tel12}-${LGSampleData.c_tel13}`);
        expect(customerInfo.email).to.equal(`${LGSampleData.c_email1}@${LGSampleData.c_email2}`);
        expect(customerInfo.zipCode).to.equal(`${LGSampleData.c_zipcode1}-${LGSampleData.c_zipcode2}`);
        expect(customerInfo.address).to.equal(LGSampleData.c_address);
        expect(customerInfo.address2).to.equal(LGSampleData.c_address2);
        expect(customerInfo.securityNumber).to.equal(`${LGSampleData.c_jumin1}${LGSampleData.c_jumin2}`);
    });

    it('getter PaymentInfo', () => {
        const paymentInfo: PaymentInfo = telecomDTO.PaymentInfo;

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
        const productInfo: ProductInfo = telecomDTO.ProductInfo;

        expect(productInfo.internet).to.equal(LGSampleData.board_internet);
        expect(productInfo.tv).to.equal(LGSampleData.board_tv);
        expect(productInfo.tvAdd).to.equal(LGSampleData.board_tv_add);
        expect(productInfo.telephone).to.equal(LGSampleData.board_tel);
        expect(productInfo.settoppBox).to.equal(LGSampleData.board_settop);
        expect(productInfo.wireless).to.equal(LGSampleData.board_wifi);
        expect(productInfo.countractDue).to.equal(LGSampleData.g_code_promise);
    });

    it('getter PaybackInfo', () => {
        const paybackInfo: PaybackInfo = telecomDTO.PaybackInfo;

        expect(paybackInfo.bankName).to.equal(getBankNameByBankCode(Number(LGSampleData.g_sp_bank_code)));
        expect(paybackInfo.accountNumber).to.equal(LGSampleData.g_sp_bank_acount);
        expect(paybackInfo.accountHolder).to.equal(LGSampleData.g_sp_bank_holder);
        expect(paybackInfo.giftCardName).to.equal(getGiftCardNameByCode(Number(LGSampleData.g_sp_giftcard_code)));
    });

    it('getter TelephoneContractInfo', () => {
        const telephoneContractInfo: TelephoneContractInfo = telecomDTO.PrevTelephoneContractInfo;

        expect(telephoneContractInfo.carrierMoveCheck).to.equal(LGSampleData.telephone_carrier_move_chk !== 'false');
        expect(telephoneContractInfo.carrier).to.equal(LGSampleData.g_move_company);
        expect(telephoneContractInfo.phoneNumber).to.equal(LGSampleData.g_move_tel1);
        expect(telephoneContractInfo.authMethod).to.equal(LGSampleData.g_move_auth);
        expect(telephoneContractInfo.authCode).to.equal(Number(LGSampleData.g_move_no));
    });

    it('getter CombinationCommodityInfo', () => {
        const combinationCommodityInfo: CombinationCommodityInfo = telecomDTO.CombinationCommodityInfo;

        expect(combinationCommodityInfo.CombinationOption).to.equal(LGSampleData.p_combiation);
    });
})