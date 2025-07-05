import { Status } from '@/app/shared/ui';

export default function CreatedStatus({ type }: { type: string }) {
  if (type === 'isUploading') {
    return <Status type="uploading" message="업로드 중..." size="sm" />;
  }
  if (type === 'uploading') {
    return <Status type="uploading" message="업로드 중..." size="sm" />;
  }
  if (type === 'success') {
    return (
      <Status
        type="success"
        icon={<span className="text-xs text-white">✓</span>}
        size="sm"
      />
    );
  }
  if (type === 'error') {
    return (
      <Status
        type="error"
        icon={<span className="text-xs text-white">!</span>}
        size="sm"
      />
    );
  }
  return null;
}
