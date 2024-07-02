<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FileUploadRequest;
use App\Models\Pincode;
use App\Jobs\PincodeCsvJob;
use Illuminate\Support\Facades\Bus;
use Illuminate\Bus\Batch;

class FileUploadController extends Controller
{
    public function index() {

    }

    public function create() {
        return view('upload-files');
    }

    public function store(FileUploadRequest $request) {
        // $associativeArrayData = array_map('str_getcsv',file($request->file));
        $associativeArrayData = file($request->file);
        $chunks = array_chunk($associativeArrayData,1000);
        $count = 0;
        $header = [];
        $batch = Bus::batch([])->dispatch();
        foreach ($chunks as $key => $chunk) {
            $data = array_map('str_getcsv', $chunk);
            
            // Handle the header for the first chunk
            if ($key == 0) {
                $header = $data[0];
                unset($data[0]);
            }

            // Clean the data
            $cleanedData = array_map(function ($row) use ($header) {
                $rowAssoc = array_combine($header, $row);
                $rowAssoc = array_map(function ($value) {
                    // Replace non-breaking spaces with regular spaces
                    $value = preg_replace('/\xA0/', ' ', $value);
                    // Remove non-ASCII characters
                    $value = preg_replace('/[^\x20-\x7E]/', '', $value);
                    // Trim whitespace
                    return trim($value);
                }, $rowAssoc);
                return $rowAssoc;
            }, $data);

            $batch->add(new PincodeCsvJob($header, $cleanedData));

            $count++;
        }
        return $batch;
    }

    public function getBatch($id) {
        return Bus::findBatch($id);
    }

}
