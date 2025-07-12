import { describe, expect, it } from 'vitest';
import { fileValidator } from '../ImageUpload';

describe('이미지 업로드 S3 유틸 함수 테스트', () => {
  const file = new File(['test'], 'test.png', { type: 'image/png' });
  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

  it('파일 형식 검증 테스트', () => {
    const result = fileValidator.validateType(file, allowedTypes);

    expect(result).toBe(true);
  });

  it('지원하지 않는 파일의 형식', () => {
    const pdfFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const result = fileValidator.validateType(pdfFile, allowedTypes);

    expect(result).toBe(false);
  });

  it('파일의 10MB에 유효한 사이즈', () => {
    const result = fileValidator.validateSize(file, 10);
    expect(result).toBe(true);
  });

  it('파일의 10MB에 유효하지 않는 사이즈', () => {
    const largeContent = 'x'.repeat(11 * (1024 * 1024));
    const file = new File([largeContent], 'large.png', {
      type: 'image/png',
    });
    const result = fileValidator.validateSize(file, 10);
    expect(result).toBe(false);
  });
});

describe('유효하지 않는 확장자를 기본 형식으로 반환한다.', () => {
  it('PNG 확장자를 올바르게 반환해야 한다.', () => {
    const result = fileValidator.getExtension('photo.png');
    expect(result).toBe('png');
  });

  it('JPEG 확장자를 JPG 파일로 변환한다.', () => {
    const result = fileValidator.getExtension('photo.jpeg');
    expect(result).toBe('jpg');
  });

  it('기본 형식의 값은 webp 파일로 변환한다.', () => {
    const result = fileValidator.getExtension('');

    expect(result).toBe('webp');
  });
});
