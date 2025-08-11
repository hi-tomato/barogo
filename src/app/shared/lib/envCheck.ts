/**
 * 환경 변수 확인 및 로깅 유틸리티
 */

export const checkEnvironmentVariables = () => {
  const envVars = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  };

  console.log('🔧 환경 변수 확인:', {
    ...envVars,
    NEXT_PUBLIC_KAKAO_CLIENT_ID: envVars.NEXT_PUBLIC_KAKAO_CLIENT_ID
      ? '설정됨'
      : '미설정',
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: envVars.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      ? '설정됨'
      : '미설정',
  });

  // 필수 환경 변수 확인
  const missingVars = [];

  if (!envVars.NEXT_PUBLIC_API_URL) {
    missingVars.push('NEXT_PUBLIC_API_URL');
  }

  if (missingVars.length > 0) {
    console.error('❌ 필수 환경 변수가 설정되지 않았습니다:', missingVars);
    console.error(
      '📝 .env.local 파일을 확인하거나 배포 환경에서 환경 변수를 설정해주세요.'
    );
  } else {
    console.log('✅ 모든 필수 환경 변수가 설정되었습니다.');
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    envVars,
  };
};

export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('❌ NEXT_PUBLIC_API_URL이 설정되지 않았습니다.');
    return null;
  }

  return apiUrl;
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};
