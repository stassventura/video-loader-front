import { BellIcon } from '@radix-ui/react-icons';
import { AudioLines } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import ErrorMessage from '../ui/error-message';
import useData from '@/hooks/useData';

type CardProps = React.ComponentProps<typeof Card>;
type Inputs = {
  push?: boolean;
  text: string;
  files: FileList;
  fontName: string;
};
const fonts = [
  {
    title: 'PT Mono',
    value: 'PTMono',
  },
  {
    title: 'Roboto',
    value: 'Roboto',
  },
  {
    title: 'Inter',
    value: 'Inter',
  },
  {
    title: 'Montserrat',
    value: 'Montserrat',
  },
  {
    title: 'Neucha',
    value: 'Neucha',
  },
  {
    title: 'Ubuntu',
    value: 'Ubuntu',
  },
];

export default function Form({ className, ...props }: CardProps) {
  const { loading, sendData } = useData();
  const {
    setValue,
    setError,
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      push: false,
      text: '',
      files: undefined,
      fontName: fonts[0].value,
    },
  });

  const pushValue = watch('push');
  const fontValue = watch('fontName', fonts[0].value);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let successMessage = '';
    if (data.files.length === 0)
      return setError('files', {
        message: 'Пожалуйста, выберите файлы формата mp4.',
      });
    if (data.files.length === 1) successMessage = 'Видео успешно отправлено на обработку.';
    else successMessage = 'Видео успешно отправлены на обработку.';
    const { text, fontName, files } = data;
    sendData(text, fontName, files, successMessage, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={cn('w-full xs:w-[380px] mx-auto', className)} {...props}>
        <CardHeader>
          <CardTitle>Заполните форму</CardTitle>
          <CardDescription>отправки медиафайлов</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Push Уведомления</p>
              <p className="text-sm text-muted-foreground">Отправить видео без звука</p>
            </div>
            <Switch value={String(pushValue)} onClick={() => setValue('push', !pushValue)} />
          </div>
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="text">Сообщение</Label>
            <Textarea
              id="text"
              {...register('text', {
                required: 'Это поле не может быть пустым.',
              })}
            />

            {errors.text?.message && <ErrorMessage text={errors.text?.message} />}
          </div>

          <div>
            <Label htmlFor="font">Шрифт</Label>
            <RadioGroup defaultValue={fonts[0].value} id="font" className="mt-1">
              {fonts.map((font) => (
                <div key={font.value} className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem
                    value={font.value}
                    id={font.value}
                    {...register('fontName')}
                    checked={font.value === fontValue}
                    onClick={() => setValue('fontName', font.value)}
                  />
                  <Label htmlFor={font.value} className="font-normal">
                    {font.title}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="video-files">Видеофайлы</Label>
            <Input id="video-files" type="file" accept=".mp4" multiple {...register('files')} />
            {errors.files?.message && <ErrorMessage text={errors.files?.message} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={loading}>
            Обработать видео
            <AudioLines className="ml-2 mt-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
