'use client'

interface WilayaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export default function Wilaya({ 
  value, 
  onChange, 
  placeholder = "اختر الولاية", 
  required = false,
  className = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
}: WilayaProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">الولاية</label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      >
        <option value="">{placeholder}</option>
        <option value="Adrar">أدرار - Adrar</option>
        <option value="Chlef">الشلف - Chlef</option>
        <option value="Laghouat">الأغواط - Laghouat</option>
        <option value="Oum El Bouaghi">أم البواقي - Oum El Bouaghi</option>
        <option value="Batna">باتنة - Batna</option>
        <option value="Béjaïa">بجاية - Béjaïa</option>
        <option value="Biskra">بسكرة - Biskra</option>
        <option value="Bechar">بشار - Bechar</option>
        <option value="Blida">البليدة - Blida</option>
        <option value="Bouira">البويرة - Bouira</option>
        <option value="Tamanrasset">تمنراست - Tamanrasset</option>
        <option value="Tébessa">تبسة - Tébessa</option>
        <option value="Tlemcen">تلمسان - Tlemcen</option>
        <option value="Tiaret">تيارت - Tiaret</option>
        <option value="Tizi Ouzou">تيزي وزو - Tizi Ouzou</option>
        <option value="Alger">الجزائر - Alger</option>
        <option value="Djelfa">جيجل - Djelfa</option>
        <option value="Jijel">جيجل - Jijel</option>
        <option value="Sétif">سطيف - Sétif</option>
        <option value="Saïda">سعيدة - Saïda</option>
        <option value="Skikda">سكيكدة - Skikda</option>
        <option value="Sidi Bel Abbès">سيدي بلعباس - Sidi Bel Abbès</option>
        <option value="Annaba">عنابة - Annaba</option>
        <option value="Guelma">قالمة - Guelma</option>
        <option value="Constantine">قسنطينة - Constantine</option>
        <option value="Médéa">المدية - Médéa</option>
        <option value="Mostaganem">مستغانم - Mostaganem</option>
        <option value="MSila">مسيلة - MSila</option>
        <option value="Mascara">معسكر - Mascara</option>
        <option value="Ouargla">ورقلة - Ouargla</option>
        <option value="Oran">وهران - Oran</option>
        <option value="El Bayadh">البيض - El Bayadh</option>
        <option value="Boumerdès">بومرداس - Boumerdès</option>
        <option value="El Tarf">الطارف - El Tarf</option>
        <option value="Tindouf">تندوف - Tindouf</option>
        <option value="Tissemsilt">تيسمسيلت - Tissemsilt</option>
        <option value="Eloued">الوادي - Eloued</option>
        <option value="Khenchela">خنشلة - Khenchela</option>
        <option value="Souk Ahras">سوق أهراس - Souk Ahras</option>
        <option value="Tipaza">تيبازة - Tipaza</option>
        <option value="Mila">ميلة - Mila</option>
        <option value="Aïn Defla">عين الدفلى - Aïn Defla</option>
        <option value="Naâma">النعامة - Naâma</option>
        <option value="Aïn Témouchent">عين تموشنت - Aïn Témouchent</option>
        <option value="Ghardaïa">غرداية - Ghardaïa</option>
        <option value="Relizane">غليزان - Relizane</option>
        <option value="Timimoun">تيميمون - Timimoun</option>
        <option value="Djinet">جانت - Djinet</option>
        <option value="El MGhair">المغير - El MGhair</option>
        <option value="El Menia">المنيعة - El Menia</option>
        <option value="Bordj Bou Arreridj">برج بوعريريج - Bordj Bou Arreridj</option>
      </select>
    </div>
  )
}
