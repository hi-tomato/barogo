import {
  ContactMethod,
  ParticipantAgeGroup,
  ParticipantGender,
  PaymentMethod,
} from '@/app/shared/types/enums';

export function mapGenderToEnum(genderArray: string[]): ParticipantGender {
  if (!genderArray || genderArray.length === 0) return ParticipantGender.ANY;
  const gender = genderArray[0];
  switch (gender) {
    case '남자':
    case 'MALE':
      return ParticipantGender.MALE;
    case '여자':
    case 'FEMALE':
      return ParticipantGender.FEMALE;
    default:
      return ParticipantGender.ANY;
  }
}

export function mapAgeToEnum(ageArray: string[]): ParticipantAgeGroup {
  if (!ageArray || ageArray.length === 0) return ParticipantAgeGroup.ANY;
  const age = ageArray[0];
  switch (age) {
    case '20대':
    case 'TWENTIES':
      return ParticipantAgeGroup.TWENTIES;
    case '30대':
    case 'THIRTIES':
      return ParticipantAgeGroup.THIRTIES;
    case '40대':
    case 'FORTIES':
      return ParticipantAgeGroup.FORTIES;
    default:
      return ParticipantAgeGroup.ANY;
  }
}

export function mapContactMethodToEnum(method: string): ContactMethod {
  switch (method) {
    case 'app':
    case 'APP_CHAT':
      return ContactMethod.APP_CHAT;
    case 'kakao':
    case 'KAKAO_TALK':
      return ContactMethod.KAKAO_TALK;
    case 'phone':
    case 'PHONE_NUMBER':
      return ContactMethod.PHONE_NUMBER;
    default:
      return ContactMethod.APP_CHAT;
  }
}

export function mapPaymentMethodToEnum(method?: string): PaymentMethod {
  switch (method) {
    case 'dutch':
    case 'DUTCH_PAY':
      return PaymentMethod.DUTCH_PAY;
    case 'host':
    case 'HOST_PAYS':
      return PaymentMethod.HOST_PAYS;
    case 'discuss':
    case 'NEGOTIABLE':
      return PaymentMethod.NEGOTIABLE;
    default:
      return PaymentMethod.DUTCH_PAY;
  }
}
