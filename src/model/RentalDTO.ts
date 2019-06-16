import rentalFormData from './rentalFormData';
import { getBankNameByBankCode, getCardNameByCardCode, getGiftCardNameByCode } from '../utils/FinancialUtil';

export default class RentalDTO {
    private formData: rentalFormData;

    constructor(formData: rentalFormData) {
        this.formData = formData;
    }


    /** 
     * 고객 정보
     */
    public get CustomerInfo(): CustomerInfo {
        return {
            name: this.formData.c_name,
            mobileCarrier: this.formData.c_tel2_type,
            mobileNumber: `${this.formData.c_tel21}-${this.formData.c_tel22}-${this.formData.c_tel23}`,
            mobileAuth: this.formData.g_auth ? true : false,
            zipCode: `${this.formData.c_zipcode1}-${this.formData.c_zipcode2}`,
            address: this.formData.c_address,
            address2: this.formData.c_address2,
            birthday: `${this.formData.c_jumin1}`
        }
    }

    /**
     * 상품 정보
     */
    public get ProductInfo(): ProductInfo {
        return {
            vendor: this.formData.p_vendor,
            types: this.formData.p_product,
            countractDue: this.formData.p_promise
        }
    }

    /**
     * 사은품 정보
     */
    public get PaybackInfo(): PaybackInfo {
        return {
            bankName : getBankNameByBankCode(Number(this.formData.g_sp_bank_code)),
            accountNumber : this.formData.g_sp_bank_acount,
            accountHolder : this.formData.g_sp_bank_holder,
            giftCardName: getGiftCardNameByCode(Number(this.formData.g_sp_giftcard_code))
        }
    }

    /**
     * 납부 정보
     */
     public get PaymentInfo(): PaymentInfo {
        return {
            paymentMethod: this.formData.g_payment_method,
            bankName: getBankNameByBankCode(Number(this.formData.g_bank_cd)),
            accountNumber: this.formData.g_bank_no,
            accountHoler: this.formData.g_bank_holder,
            cardName: getCardNameByCardCode(Number(this.formData.g_card_cd)),
            cardNumber: this.formData.g_card_no,
            cardExpirationDate: `${this.formData.g_card_gigan}년${this.formData.g_card_gigan1}월`,
            cardHolder: this.formData.g_card_holder
        };
    }

    //비고란
    public get Remarks(): string {
        return this.formData.g_bigo;
    }

    //약관 동의 여부
    public get AgreeContrat(): boolean {
        return Boolean(this.formData.w_agree);
    }

}

export interface CustomerInfo {
    name: string; //이름
    mobileCarrier: string; //통신사
    mobileNumber: string; //핸드폰 번호
    mobileAuth: boolean; //본인 여부
    zipCode: string; //우편번호
    address: string; //주소
    address2: string; //상세 주소
    birthday: string //생년월일
}

export interface ProductInfo {
    vendor: string[]; //가입 회사
    types: string[]; //가입 상품
    countractDue: string; //약정 기간
}

export interface PaybackInfo {
    bankName: string; // 사은품 지급 은행
    accountNumber: string; //사은품 지급 계좌
    accountHolder: string; //사은품 지급 계좌 예금주
    giftCardName: string; //사은품 상품권 이름
}

export interface PaymentInfo {
    paymentMethod: string; //지불 방법?? 변수명 다른걸로
    bankName: string; //은행
    accountNumber: string; //계좌번호
    accountHoler: string; //예금주
    cardName: string; //카드 이름
    cardNumber: string; //카드 번호
    cardExpirationDate: string; //카드 유효기간
    cardHolder: string; //카드주
}