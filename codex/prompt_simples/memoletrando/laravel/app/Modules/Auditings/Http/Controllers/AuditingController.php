<?php

namespace App\Modules\Auditings\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Auditings\Http\Requests\AuditingRequest;
use App\Modules\Auditings\AuditingService;
use Illuminate\Http\Request;

class AuditingController extends Controller
{
    public function __construct(AuditingService $auditing_service)
    {
        // $this->authorizeResource("App\Modules\Auditings\Auditing", "App\Modules\Auditings\Auditing");
        $this->auditing_service = $auditing_service;
    }

    public function store(AuditingRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.auditings::toasts.store'),
            'auditing' => $this->auditing_service->store($request->toArray()),
        ]);
    }

    public function update(AuditingRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.auditings::toasts.update'),
            'auditing' => $this->auditing_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->auditing_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.auditings::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->auditing_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.auditings::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'auditings' => $this->auditing_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'auditing' => $this->auditing_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->auditing_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore' => 'restore',
        ]);
    }
}
