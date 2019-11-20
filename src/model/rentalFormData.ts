export default interface RentalFormData {
    c_name: string;// 김진구
    c_tel2_type: string; //LG알뜰폰
    c_tel21: string; //010
    c_tel22: string; //9361
    c_tel23: string; //3291
    g_auth?: string; //본인
    c_tel31: string; //010 상담받은연락처
    c_tel32: string; //9361
    c_tel33: string; //3291
    c_zipcode1: string; //463
    c_zipcode2: string; //894
    c_address: string; //대구시 동구 신천3동 화성파크드림 133동 1201호
    c_address2: string; //133동 1201호
    c_jumin1: string; //880512
    c_gender: string; //남
    g_payment_method: string; //은행
    g_bank_cd: string; //4
    g_bank_no: string; //620-239007-853
    g_bank_holder: string; //김진구
    g_card_cd:string; //3
    g_card_no:string; //카드 번호
    g_card_gigan:string; //카드 유효기간 년
    g_card_gigan1: string; //카드 유효기간 월
    g_card_holder: string; //카드 주
    content_copy: string; //필요없는 값, 위와 같은 여부
    g_sp_bank_code: string; //3
    g_sp_bank_acount: string; //620-2023307-853
    g_sp_bank_holder: string; //김진구
    g_sp_giftcard_code: string; //1, 2
    p_vendor: string[]; //[LG, '']
    p_product: string[]; // ['정수기', '공기청정기', '']
    p_product_name: string; //(정수기)WD502AS
    p_product_color: string; //(정수기)그레이
    p_promise: string; //3년약정
    g_bigo: string; //비고란이다 ㅎㅎㅎ
    w_agree: string; //true
}