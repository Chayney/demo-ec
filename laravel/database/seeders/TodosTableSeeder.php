<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'user_id' => 1,
            'title' => 'Todo1',
            'content' => 'Todo1 Content',
            'created_at' => now(),
            'updated_at' => now(),
        ];
        DB::table('todos')->insert($param);
        $param = [
            'user_id' => 1,
            'title' => 'Todo2',
            'content' => 'Todo2 Content',
            'created_at' => now(),
            'updated_at' => now(),
        ];
        DB::table('todos')->insert($param);
    }
}