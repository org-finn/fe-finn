import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getUserInfoPath } from '@/api/hooks/useGetUserInfo';

export const myPageHandlers = [
  http.get(`${BASE_URL}${getUserInfoPath()}`, () => {
    return HttpResponse.json({
      code: '200',
      message: 'success',
      content: {
        nickname: '가나디',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEH9YJyZ8cIW7fXHzSw3N_PpYE6JFkcrUtKw&s',
      },
    });
  }),
];
