<?php

namespace App\Modules\Images;

use App\Modules\Base\Services\ApiService;
use File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as InterventionImage;
use Storage;

class ImageService
{
    public function __construct(Image $model)
    {
        $this->model       = $model;
        $this->api         = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
        $this->s3          = Storage::disk('s3');
        $this->folder_temp = './temp';
        $this->folder_s3   = 'images';

        $this->thumbs = [
            [
                'prefix' => 'thumb_',
            ],
        ];
    }

    protected function getCustomFilters()
    {
        return [
            // 'chave' => function($query, $key, $input) {}
        ];
    }

    protected function getCustomSorts()
    {
        return [
            // 'coluna' => function($query, $column, $order) {}
        ];
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            if ($data['base64']) {
                $base64 = $this->getExtensionBase64($data['base64']);
                $name   = Str::random(15) . '.' . $base64['extension'];
                $this->storeBase64($base64, $name);
                $image = InterventionImage::make($this->folder_temp . '/' . $name);
                $image->save($this->folder_temp . '/' . $name, 100);

            }

            $data['path'] = $this->folder_s3 . '/' . $data['imageable_type'] . '/' . $data['imageable_id'] . '_' . $name;
            $model        = $this->model->create($data);

            $temp = $this->folder_temp . '/' . $name;

            $this->move_to_s3($temp, $data['path']);

            $this->delete_temp_file($temp);

            if (isset($data['thumbs']) && $data['thumbs'] != null) {
                foreach ($data['thumbs'] as $thumb) {
                    $this->generateThumb($model->toArray(), $thumb, $model->imageable_id . '_' . $name);
                }
            }

            DB::commit();
        } catch (\Throwable$e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function generateThumb(array $data, array $thumb, string $name)
    {
        $new_name = str_replace($name, $thumb['prefix'] . $name, $data['path']);

        $temp       = $this->folder_temp . '/' . $name;
        $image      = InterventionImage::make(config('filesystems.disks.s3.url') . $data['path']);
        $_image_bkp = clone $image;
        $image->resize($thumb['width'], null, function ($constraint) {$constraint->aspectRatio();});
        if ($image->height() < $thumb['height']) {
            $image = clone $_image_bkp;
            $image->resize(null, $thumb['height'], function ($constraint) {$constraint->aspectRatio();});
        }
        // $image->crop($thumb['width'], $thumb['height'], 0, 0);
        $image->save($temp);

        $this->move_to_s3($temp, $new_name);

        $this->delete_temp_file($temp);
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            $this->s3->delete($model->path);

            foreach ($this->thumbs as $thumb) {
                $this->destroyThumb($model->toArray(), $thumb);
            }

            $model->delete();

            DB::commit();
        } catch (\Throwable$e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function destroyThumb(array $data, array $thumb)
    {
        $path_thumb = str_replace('/' . $data['imageable_id'] . '_', '/' . $thumb['prefix'] . $data['imageable_id'] . '_', $data['path']);

        $this->s3->delete($path_thumb);
    }

    // public function upload_to_temp($request)
    // {
    //     $name = $_FILES['file']['name'];
    //     if (!file_exists($this->folder_temp)) {
    //         File::makeDirectory($this->folder_temp, 0777, true);
    //     }

    //     $path_temp = $this->folder_temp . '/' . $name;
    //     $request->file->move($this->folder_temp, $path_temp);

    //     return response()->json($path_temp, 200);
    // }

    public function move_to_s3($path_temp, $path_s3)
    {
        $this->s3->put($path_s3, file_get_contents($path_temp));
    }

    public function delete_temp_file($path_temp)
    {
        if (!empty($path_temp) && file_exists($path_temp)) {
            unlink($path_temp);
        }
    }

    public function getExtensionBase64($image)
    {
        if (isset($image['base64'])) {
            $base = explode(',', $image['base64']);
        } else {
            $base = explode(',', $image);
        }

        $image     = $base[1];
        $extension = str_replace('data:image/', '', $base[0]);
        $extension = str_replace(';base64', '', $extension);
        return ['image' => $image, 'extension' => $extension];
    }

    public function storeBase64(array $imageBase64, string $name)
    {
        if (!file_exists($this->folder_temp)) {
            File::makeDirectory($this->folder_temp, 0777, true);
        }

        $output_file = $this->folder_temp . '/' . $name;
        $image       = fopen($output_file, "wb");
        fwrite($image, base64_decode($imageBase64['image']));
        fclose($image);
    }

    public function reorder(array $data)
    {
        try {
            DB::beginTransaction();

            foreach ($data as $image) {
                $model = $this->model->findOrFail($image['id']);

                $model->update($image);
            }

            DB::commit();
        } catch (\Throwable$th) {
            DB::rollBack();
            throw $th;
        }
    }
}
