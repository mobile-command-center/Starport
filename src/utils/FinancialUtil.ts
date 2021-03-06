export function getCardNameByCardCode(cardCode: number): string {
    switch(cardCode) {
    case 0:
        return '미선택';
    case 1:
        return 'KB카드';
    case 2:
        return 'BC카드';
    case 3:
        return '우리카드';
    case 4:
        return '하나(BC)카드';
    case 5:
        return '농협(BC)카드';
    case 6:
        return '삼성카드';
    case 7:
        return '하나카드';
    case 8:
        return '한미카드';
    case 9:
        return '외환카드';
    case 10:
        return '현대카드';
    case 11:
        return '신한카드';
    case 12:
        return '롯데카드';
    case 13:
        return '씨티카드';
    case 14:
        return '광주카드';
    case 15:
        return '산업은행카드';
    case 16:
        return '수협카드';
    case 17:
        return '전북은행카드';
    case 18:
        return '제주은행카드';
    case 19:
        return 'LG카드';
    default:
        return '오류';
    }
}

export function getBankNameByBankCode(bankCode: number): string {
    switch(bankCode) {
        case 0:
            return '미선택';
        case 1:
            return '한국은행';
        case 2:
            return '산업은행';
        case 3:
            return '기업은행';
        case 4:
            return '외환은행';
        case 5:
            return '국민은행';
        case 6:
            return '수협중앙회';
        case 7:
            return '한국수출입은행';
        case 8:
            return '농협';
        case 9:
            return '우리은행';
        case 10:
            return '조흥은행';
        case 11:
            return '제일은행';
        case 12:
            return '서울은행';
        case 13:
            return '신한은행';
        case 14:
            return '광주은행';
        case 15:
            return '새마을금고';
        case 16:
            return '신협';
        case 17:
            return '하나은행';
        case 18:
            return '우체국';
        case 19:
            return '전북은행';
        case 20:
            return '대구은행';
        case 21:
            return '부산은행';
        case 22:
            return '씨티은행';
        case 23:
            return '경남은행';
        case 24:
            return '제주은행';
        case 25:
            return '스위스저축은행';
        case 26:
            return '축협';
        case 27:
            return '현대증권';
        case 28:
            return '미래에셋증권';
        case 29:
            return '대우증권';
        case 30:
            return '삼성증권';
        case 31:
            return '한국투자증권';
        case 32:
            return '우리투자증권';
        case 33:
            return '하이투자증권';
        case 34:
            return '현대차증권';
        case 35:
            return 'SK증권';
        case 36:
            return '한화증권';
        case 37:
            return '하나대투증권';
        case 38:
            return '신한금융투자';
        case 39:
            return '메리츠증권';
        case 40:
            return '유진투자증권';
        case 41:
            return '신영증권';
        case 42:
            return '교보증권';
        case 43:
            return '산림조합';
        case 44:
            return '부국증권';
        case 45:
            return '대신증권';
        case 46:
            return '동부증권';
        case 47:
            return '이트레이드증권';
        case 48:
            return '솔로몬투자증권';
        case 49:
            return 'NH투자증권';
        case 50:
            return 'LIG투자증권';
        case 51:
            return '키움증권';
        case 52:
            return 'HSBC';
        case 53:
            return 'JP 모간';
        case 54:
            return '도이치뱅크';
        case 55:
            return '뱅크오브아메리카';
        case 56:
            return '동양종합금융증권';
        case 57:
            return '미쓰비시도쿄UFJ';
        case 58:
            return '카카오뱅크';
        case 59:
            return '케이뱅크';
        default:
            return '오류';
    }
}

export function getGiftCardNameByCode(giftCardCode: number) {
    switch(giftCardCode) {
        case 0:
            return '미선택';
        case 1:
            return '신세계 상품권';
        case 2:
            return '홈플러스 상품권';
        case 3:
            return 'OK 캐시백';
        case 4:
            return 'SK 상품권';
        default:
            return '오류';
    }
}